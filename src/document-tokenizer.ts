import { StringTokenizer } from '@fsnjs/tokenize';
import { DocDirective, isDocDirective } from './directive.js';
import { DocDirectiveToken, Token, TokenType } from './token.js';
import { readFile } from '@fsnjs/fs';

export class DocumentTokenizer extends StringTokenizer<Token> {
    constructor(
        url: string,
        public offset = 0
    ) {
        super(readFile(url, { parse: false }), url);
    }

    override onNextToken(val: string) {
        if (val === '@') return this._consumeDirective();
        if (val === '`') return this._consumeCodeOrCodeBlock();
        if (val === '#') return this._consumeHeading();

        this.tokens.push({
            type: TokenType.STRING,
            value: this.consume(val).until((char) => /@|`|#/.test(char))
        });
    }

    private _consumeDirective() {
        const directiveType = <DocDirective>this.consumeWord('@');

        if (directiveType === '@render') {
            const body =
                this.consume().until((val) => val === '}') + this.shift();
            this.tokens.push({
                directiveType: '@render',
                type: TokenType.DIRECTIVE,
                body,
                position: this.position
            });
            return;
        }

        if (!isDocDirective(directiveType)) {
            this.tokens.push(directiveType);
            return;
        }

        let val: DocDirectiveToken = {
            type: TokenType.DIRECTIVE,
            directiveType: directiveType,
            args: this._parseArgs()
        };

        this.tokens.push(val);
    }

    private _parseArgs() {
        let args: string = this.consume()
            .until((val) => val === ';')
            .trim();
        this.shift();

        if (!args.includes('{') || !args.includes('}')) {
            if (/^(\.|\/)/.test(args)) return { url: args };
            return { value: args };
        }

        let rawObj = args
            .substring(args.indexOf('{'), args.indexOf('}') + 1)
            .trim();
        let url = args.substring(args.indexOf('}') + 1).trim();

        return {
            ...JSON.parse(rawObj),
            url
        };
    }

    private _consumeCodeOrCodeBlock() {
        let code = '`';
        while (this.peek() === '`') code += this.shift();
        code += this.consume().until((val) => val === '`');
        while (this.peek() === '`') code += this.shift();

        this.tokens.push({
            type: TokenType.STRING,
            value: code
        });
    }

    private _consumeHeading() {
        const headingVal = this.consume('#').until((val) => val === '\n');
        this.tokens.push({
            type: TokenType.HEADING,
            value: headingVal
        });
    }
}

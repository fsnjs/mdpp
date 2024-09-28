import { isDocRenderToken, Token, TokenType } from './token.js';
import { Image, Include } from './directive.js';
import { DocumentTokenizer } from './document-tokenizer.js';
import { dirname, join } from 'path';
import Document from './dom.js';

export class DocumentParser extends DocumentTokenizer {
    /**
     * Stores the pre-parsed tokens and content.
     * @private
     */
    private _preParsed: any[] = [];

    /**
     * Stores the content of the document.
     * @public
     */
    public content = '';

    /**
     * Accumulates the content and structured tokens for further processing.
     *
     * @public
     */
    public parse() {
        let token: Token | undefined;
        while ((token = this.tokens.shift())) {
            if (token.type === TokenType.STRING) {
                this.content += token.value;
                continue;
            }

            if (token.type === TokenType.HEADING) {
                const heading = this._parseHeading(token.value, this.offset);
                this.content += heading;
                continue;
            }

            if (token.type !== TokenType.DIRECTIVE) continue;

            if (isDocRenderToken(token)) {
                this._parseRender(token.body);
                continue;
            }

            switch (token.directiveType) {
                case '@include':
                    this.content += this._parseInclude(token.args);
                    continue;
                case '@link':
                    this.content += this._parseLink(token.args);
                    continue;
                case '@image':
                    this.content += this._parseImage(token.args);
                    continue;
            }

            this._preParsed.push(token);
        }

        return this;
    }

    private _parseRender(body: string) {
        if (body.includes('```')) {
            body = body.substring(
                body.indexOf('```') + 3,
                body.lastIndexOf('```')
            );
        }

        if (body.includes('<')) {
            body = body.substring(body.indexOf('<'));
        }

        console.log(body);
    }

    /**
     * Parses the `@include` directive token by fetching and processing
     * the included document.
     *
     * @param params The arguments passed with the `@include` directive.
     * @param params.url The URL of the file to include.
     * @param params.collapse If provided, the content will be wrapped in
     * a collapsible HTML `<details>` element.
     * @param params.offset The offset for heading levels within the included document.
     * @param params.range A comma-separated string specifying the start and
     * end line numbers to include from the file.
     *
     * @returns The content of the included file, optionally collapsed
     * or sliced by range.
     *
     * @private
     */
    private _parseInclude({ url, collapse, offset, range }: Include) {
        const path = join(dirname(this.path), url);
        offset = (offset ?? 0) + this.offset;

        let included = new DocumentParser(path, offset);
        included.tokenize();
        included.parse();

        let child = included.content;

        if (range) {
            const [start, end] = range.split(',');

            let startIndex = 0;
            let endIndex = child.length - 1;

            if (/[0-9]/.test(start)) startIndex = Number(start) - 1;
            if (/[0-9]/.test(end)) endIndex = Number(end) - 1;

            child = child.split(/\n/g).slice(startIndex, endIndex).join('\n');
        }

        if (collapse) {
            const summary = Document.createElement('summary');
            summary.appendChild(Document.createTextNode(collapse));

            const details = Document.createElement('details');
            details.appendChild(summary);
            details.appendChild(Document.createTextNode(child));

            // child = Document.createElement()
            // `<details>\n<summary>${collapse}</summary>\n${child}\n</details>`;
            child = new Document(details).render();
        }

        return child;
    }

    private _parseImage({ url, alt, width, height, align }: Image) {
        alt = alt ? ` alt="${alt}"` : '';

        width = this._formatPx(width);
        height = this._formatPx(height);

        const image = `<img src="${url}" ${alt} width="${width}" height="${height}">`;

        if (!align) return image;

        return `<div style="display:flex;justify-content:${align}">${image}</div>`;
    }

    private _formatPx(pixels?: number | string) {
        if (pixels === undefined) return 'auto';
        if (typeof pixels !== 'string') return `${pixels}px`;
        return pixels.endsWith('px') ? pixels : pixels + 'px';
    }

    /**
     * Parses a heading token by adjusting its level based on the
     * offset and formats it as needed.
     *
     * Also generates a URL-friendly heading reference and pushes
     * it into the global `headings` object.
     *
     * @param value The value of the heading token.
     * @param offset The level offset to adjust the heading size.
     * @returns The formatted heading value.
     *
     * @private
     */
    private _parseHeading(value: string, offset = 0) {
        if (offset === 0) return value;

        let level = value.substring(0, value.lastIndexOf('#') + 1);
        let title = value.replace(level, '');

        offset = level.length + offset;
        if (offset > 0) return '#'.repeat(offset) + title;

        return title;
    }

    private _parseLink({ value: link }: any) {
        let href = this._hrefFormat(link);
        return `[${link}](${href})`;
    }

    /**
     * Converts a heading title into a URL-friendly format
     * (i.e., lowercase and hyphenated).
     *
     * @param title The heading title to format.
     * @returns The URL-friendly formatted heading (anchor link).
     *
     * @private
     */
    private _hrefFormat(title: string) {
        let href = '#';

        const refChars = [...title];
        let char: string | undefined;
        while ((char = refChars.shift())) {
            if (/[a-z]|[0-9]/.test(char)) {
                href += char.toLowerCase();
                continue;
            }

            if (char === ' ') {
                href += '-';
                continue;
            }
        }

        return href;
    }
}

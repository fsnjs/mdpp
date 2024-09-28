import { afterAll, beforeAll, describe, expect, it } from '@fsnjs/test';

import { DocumentTokenizer } from './document-tokenizer.js';
import { Include } from './directive.js';
import { rmSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const directiveWithArgs = {
    path: resolve('directive-with-args.md'),
    content:
        '@include { "offset": 1, "collapse": "@include", "range": "2," } ./directives/include.md;'
};

const directiveNoArgs = {
    path: resolve('directive-no-args.md'),
    content: '@include ./directives/include.md;'
};

const linkDirective = {
    path: resolve('link-directive.md'),
    content: '@include ./directives/include.md;'
};

const files = [directiveWithArgs, directiveNoArgs, linkDirective];

describe('Document tokenizer', () => {
    beforeAll(() =>
        files.forEach((f) => {
            writeFileSync(f.path, f.content);
        })
    );

    it('Can parse include directive with args', () => {
        const { path } = directiveWithArgs;
        const parsed: Include = new DocumentTokenizer(path, 0)['_parseArgs']();
        expect(parsed.url).toEqual('./directives/include.md');
        expect(parsed.collapse).toEqual('@include');
        expect(parsed.range).toEqual('2,');
        expect(parsed.offset).toEqual(1);
    });

    it('Can parse include directive without args', () => {
        const { path } = directiveNoArgs;
        const parsed: Include = new DocumentTokenizer(path, 0)['_parseArgs']();
        expect(parsed.url).toEqual('./directives/include.md');
    });

    it('Can parse link directive', () => {
        const { path } = linkDirective;
        const parsed: { value: string } = new DocumentTokenizer(path, 0)[
            '_parseArgs'
        ]();
        expect(parsed.value).toEqual('`@include`');
    });

    afterAll(() => files.forEach((f) => rmSync(f.path)));
});

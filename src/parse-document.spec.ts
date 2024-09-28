import { describe, it } from '@fsnjs/test';
import { resolve } from 'path';
import { DocumentParser } from './parse-document.js';
import { writeFileSync } from 'fs';

const root = resolve('docs', 'index.md');

describe('Document Pre-parser', () => {
    it('Can pre-parse document', () => {
        const preParser = new DocumentParser(root).tokenize().parse();
        writeFileSync(resolve('out.md'), preParser.content, 'utf-8');
    });
});

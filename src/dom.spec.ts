import document from './dom.js';
import { describe, it } from '@fsnjs/test';

describe('Virtual DOM', () => {
    it('Can reate a DOM string', () => {
        const text = document.createTextNode('Lorem ipsum');

        const div = document.createElement('span');
        div.appendChild(text);

        const root = document.createElement('div');
        root.appendChild(div);

        root.style.accentColor = 'green';

        const doc = new document(root);

        console.log(doc.render());
    });
});

/// <reference lib="dom" />

import { isTruthy } from '@fsnjs/truthy';

export class Document {
    public nodes: Node[];

    constructor(...rootNode: Node[]) {
        this.nodes = rootNode;
    }

    render() {
        return this.nodes.map((node) => node['_render'](1)).join('\n');
    }

    static createElement(tagName: keyof HTMLElementTagNameMap) {
        return new Node(tagName);
    }

    static createTextNode(textContent: string) {
        return new Text(textContent);
    }
}

export class Text {
    constructor(public textContent: string) {}
}

export function isText(val: any): val is Text {
    return isTruthy(val) && typeof val === 'object' && 'textContent' in val;
}

export class Node {
    nodeValue?: string;
    children?: (Node | Text)[];
    id?: string;

    public classList = new Set<string>();
    public style: Partial<CSSStyleDeclaration> = {};

    constructor(public tagName: keyof HTMLElementTagNameMap) {}

    public appendChild(node: Node | Text) {
        this.children ??= [];
        this.children.push(node);
    }

    public removeChild(node: Node | Text) {
        if (this === node) return true;
        if (!this.children) return false;
        let index = 0;
        for (let child of this.children) {
            if (isText(child)) continue;
            if (node === child) {
                this.children.splice(index, 1);
                return true;
            }
            if (child.removeChild(node)) return true;
            index++;
        }
        return false;
    }

    public getElementById(id: string): Node | undefined {
        if (this.id === id) return this;
        if (!this.children) return;
        for (let child of this.children) {
            if (isText(child)) continue;
            if (child.id === id) return child;
            const ch = child.getElementById(id);
            if (ch) return ch;
        }
        return;
    }

    public getElementByTag(tagName: keyof HTMLElementTagNameMap) {
        const elements: Node[] = [];

        if (this.tagName === tagName) elements.push(this);
        if (!this.children) return elements;

        elements.push(
            ...this.children
                .flatMap((node) => {
                    if (isText(node)) return;
                    return node.getElementByTag(tagName);
                })
                .filter(isTruthy)
        );

        return elements;
    }

    private _render(depth = 0) {
        const open = this._openTag(depth);
        const close = this._closeTag(depth);

        const content = (this.children ?? [])
            .flatMap((child) =>
                isText(child)
                    ? this._indent(depth + 1, child.textContent)
                    : child._render(depth + 1)
            )
            .join('');

        return [open, content, close].join('\n');
    }

    private _openTag(depth: number) {
        let tag: string[] = [this.tagName];

        const style = this._style();
        if (style) tag.push(style);

        const clazz = this._class();
        if (clazz) tag.push(clazz);

        return this._indent(depth, `<${tag.join(' ')}>`);
    }

    private _closeTag(depth: number) {
        return this._indent(depth, `</${this.tagName}>`);
    }

    private _style() {
        let styles = Object.entries(this.style)
            .map(([name, value]) => name + ':' + value)
            .join(';');
        if (styles.length === 0) return;
        return `style="${styles};"`;
    }

    private _class() {
        let classes = Array.from(this.classList).join(' ');
        if (classes.length === 0) return;
        return `class="${classes}"`;
    }

    private _indent(depth: number, content: string) {
        return (depth > 0 ? '  '.repeat(depth) : '') + content;
    }
}

export default Document;

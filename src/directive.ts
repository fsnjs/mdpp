import { isTruthy } from '@fsnjs/truthy';

export declare type DocDirective =
    | '@include'
    | '@link'
    | '@toc'
    | '@note'
    | '@warn'
    | '@info'
    | '@image'
    | '@render';

export function isDocDirective(val: any): val is DocDirective {
    return (
        isTruthy(val) &&
        typeof val === 'string' &&
        (val === '@include' ||
            val === '@link' ||
            val === '@toc' ||
            val === '@note' ||
            val === '@warn' ||
            val === '@info' ||
            val === '@image')
    );
}

export function isDocDirectiveArgs(val: string) {
    return /^\{.{1,}\}$/.test(val);
}

export function isDocDirectiveArgsWithUrl(val: string) {
    return /^\{.{1,}\}\s\.{1,}.{1,}$/.test(val);
}

export declare interface Include {
    url: string;
    offset?: number;
    range?: string;
    collapse?: string;
}

export declare interface Image {
    url: string;
    alt?: string;
    title?: string;
    width?: number | string;
    height?: number | string;
    align?: 'left' | 'right' | 'center';
}

export declare interface Toc {
    numbered?: boolean;
    depth?: number;
}

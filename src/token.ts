import { isTruthy } from '@fsnjs/truthy';
import { DocDirective } from './directive.js';

/**
 * Enumeration representing the different types of tokens.
 *
 * @enum {number}
 */
export enum TokenType {
    /** A string token. */
    STRING,
    /** A directive token. */
    DIRECTIVE,
    /** A heading token. */
    HEADING
}

/**
 * Represents a basic documentation token, either of type `HEADING` or `STRING`.
 *
 * @interface
 * @property {TokenType.HEADING | TokenType.STRING} type - The type of the token, which can be either `HEADING` or `STRING`.
 * @property {number} [position] - The optional position of the token in the document.
 * @property {string} value - The value or content of the token.
 */
export declare interface DocToken {
    type: TokenType.HEADING | TokenType.STRING;
    position?: number;
    value: string;
}

/**
 * Safely assert that the given value is a `DocToken`.
 *
 * @param {any} val - The value to be checked.
 * @returns {val is DocToken} `true` if the value is a valid `DocToken`, otherwise `false`.
 *
 * @example
 * const token = { type: TokenType.STRING, value: "example" };
 * if (isDocToken(token)) {
 *   console.log("Valid DocToken");
 * }
 */
export function isDocToken(val: any): val is DocToken {
    return (
        isTruthy(val) &&
        typeof val === 'object' &&
        'type' in val &&
        val.type !== TokenType.DIRECTIVE
    );
}

/**
 * Represents a documentation token specifically for directives.
 *
 * @interface
 * @property {TokenType.DIRECTIVE} type - The type of the token, always `DIRECTIVE`.
 * @property {DocDirective} directiveType - The specific type of directive the token represents.
 * @property {string} [position] - The optional position of the directive in the document.
 * @property {any} [args] - Optional arguments related to the directive.
 */
export declare interface DocDirectiveToken {
    type: TokenType.DIRECTIVE;
    directiveType: DocDirective;
    position?: string;
    args?: any;
}

/**
 * Represents a documentation token specifically for directives.
 *
 * @interface
 * @property {TokenType.DIRECTIVE} type - The type of the token, always `DIRECTIVE`.
 * @property {DocDirective} directiveType - The specific type of directive the token represents.
 * @property {string} body - The optional position of the directive in the document.
 * @property {number} [position] - Optional arguments related to the directive.
 */
export declare interface DocRenderToken {
    type: TokenType.DIRECTIVE;
    directiveType: DocDirective;
    body: string;
    position?: number;
}

export function isDocRenderToken(val: any): val is DocRenderToken {
    return (
        isTruthy(val) &&
        typeof val === 'object' &&
        'body' in val &&
        'directiveType' in val &&
        val['directiveType'] === '@render'
    );
}

/**
 * Safely assert that the given value is a `DocDirectiveToken`.
 *
 * @param {any} val - The value to be checked.
 * @returns {val is DocDirectiveToken} `true` if the value is a valid `DocDirectiveToken`, otherwise `false`.
 *
 * @example
 * const directiveToken = { type: TokenType.DIRECTIVE, directiveType: "exampleDirective" };
 * if (isDocDirectiveToken(directiveToken)) {
 *   console.log("Valid DocDirectiveToken");
 * }
 */
export function isDocDirectiveToken(val: any): val is DocDirectiveToken {
    return (
        isTruthy(val) &&
        typeof val === 'object' &&
        'type' in val &&
        val.type === TokenType.DIRECTIVE
    );
}

/**
 * A union type representing either a `DocToken` or a `DocDirectiveToken`.
 */
export declare type Token = DocToken | DocDirectiveToken | DocRenderToken;

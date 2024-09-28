<div style="display:flex;justify-content:center"><img src="./icon.svg"  alt="m++ icon" width="250px" height="auto"></div>



## Introduction

MD++ is a markdown framework that facilitates re-use.

Instead of having a massive single markdown file or a markdown file
that links to other markdown files, markdown++ allows you to
to insert the content of child documents into parent documents.

For example, let's say you have a child section that is repeated
multiple times throughout your documentation. Instead of copy/pasting
the content into multiple places, you can use the `@include` directive
to embed the child content into the parent document with the syntax...

```
@include ../relative/path/to/my.md;
```

For detailed information about supported directives and their uses,
see the following sections.

## Directives

| Name       | Descr iption                                   | Details           |
| ---------- | ---------------------------------------------- | ----------------- |
| `@include` | Embed child documents into the parent document | [`@include`](#include) |
| `@link`    | Create a link to child documents               | [`@link`](#link)    |
| `@toc`     | Generate a table of contents                   | [`@toc`](#toc)     |
| `@note`    | Mark a paragraph as a `note`                   | [`@note`](#note)    |
| `@warn`    | Mark a paragraph as a `warning`                | [`@warn`](#warn)    |
| `@info`    | Mark a paragraph as an `info`                  | [`@info`](#info)    |

;

### `@include`

`@include` allows you to embed child documents into the parent document
and to re-use content. The directive accepts the following arguments:

| Name    | Type     | Description                                                 |
| ------- | -------- | ----------------------------------------------------------- |
| offset  | `number` | Increases the heading level by `number`                     |
| include | `range`  | Include the defined range of lines from the child document. |

  <details>
    <summary>
      `@range`
    </summary>    A range is a string primitive that defines a subset or slice of a collection,
such as lines in a document. Ranges must adhere to the following format:

| Format                | Description                                                      | Example |
| --------------------- | ---------------------------------------------------------------- | ------- |
| `startIndex,endIndex` | Include values between `startIndex` and `endIndex`               | "5,10"  |
| `startIndex,`         | Include all values in the collection, starting with `startIndex` | "5,"    |
| `,endIndex`           | Include all values up to and including `endIndex`                | ",5"    |

  </details>

#### Examples

Increase child heading levels by one, and only include lines 5 - 10:

```
@include { "offset": 1, "range": "5,10" }
```

### `@link`

### `@toc`

### `@note`

### `@warn`

### `@info`


## Data Types

There are two "types" of arguments, primitive types, such as `string`,
`number`, and `boolean`, and custom types, such as `range`. Use primitive
types as you would in any programming languages--i.e., `string` variables
are surrounded by single or double quotes, and numbers and booleans should not
be surrounded by quotes.

Custom types, on the other hand, are usually a combination of primite types
and must follow a specific format. These custom types and their formats
are defined in the sections below.

### `range`

A range is a string primitive that defines a subset or slice of a collection,
such as lines in a document. Ranges must adhere to the following format:

| Format                | Description                                                      | Example |
| --------------------- | ---------------------------------------------------------------- | ------- |
| `startIndex,endIndex` | Include values between `startIndex` and `endIndex`               | "5,10"  |
| `startIndex,`         | Include all values in the collection, starting with `startIndex` | "5,"    |
| `,endIndex`           | Include all values up to and including `endIndex`                | ",5"    |



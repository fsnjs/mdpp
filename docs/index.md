@image {
"alt": "m++ icon",
"title": "MD++ Icon",
"width": 250,
"align": "center"
} ./icon.svg;

@toc;

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

@include { "offset": 1 } ./directives.md;
@include { "offset": 1 } ./data-types.md;

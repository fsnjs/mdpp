# Directives

| Name       | Descr iption                                   | Details           |
| ---------- | ---------------------------------------------- | ----------------- |
| `@include` | Embed child documents into the parent document | @link `@include`; |
| `@link`    | Create a link to child documents               | @link `@link`;    |
| `@toc`     | Generate a table of contents                   | @link `@toc`;     |
| `@note`    | Mark a paragraph as a `note`                   | @link `@note`;    |
| `@warn`    | Mark a paragraph as a `warning`                | @link `@warn`;    |
| `@info`    | Mark a paragraph as an `info`                  | @link `@info`;    |

@render {

```html
<table style="width:100%">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Details</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>`@include`</td>
            <td>Embed child documents into the parent document</td>
            <td>@link `@include`;</td>
        </tr>
    </tbody>
</table>
```

};

@include { "offset": 1 } ./directives/include.md;
@include { "offset": 1 } ./directives/link.md;
@include { "offset": 1 } ./directives/toc.md;
@include { "offset": 1 } ./directives/note.md;
@include { "offset": 1 } ./directives/warn.md;
@include { "offset": 1 } ./directives/info.md;

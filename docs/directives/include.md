# `@include`

`@include` allows you to embed child documents into the parent document
and to re-use content. The directive accepts the following arguments:

| Name    | Type     | Description                                                 |
| ------- | -------- | ----------------------------------------------------------- |
| offset  | `number` | Increases the heading level by `number`                     |
| include | `range`  | Include the defined range of lines from the child document. |

@include { "offset": 1, "range": "3,", "collapse": "`@range`" } ../data-types/range.md;

## Examples

Increase child heading levels by one, and only include lines 5 - 10:

```
@include { "offset": 1, "range": "5,10" }
```

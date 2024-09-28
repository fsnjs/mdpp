# `range`

A range is a string primitive that defines a subset or slice of a collection,
such as lines in a document. Ranges must adhere to the following format:

| Format                | Description                                                      | Example |
| --------------------- | ---------------------------------------------------------------- | ------- |
| `startIndex,endIndex` | Include values between `startIndex` and `endIndex`               | "5,10"  |
| `startIndex,`         | Include all values in the collection, starting with `startIndex` | "5,"    |
| `,endIndex`           | Include all values up to and including `endIndex`                | ",5"    |

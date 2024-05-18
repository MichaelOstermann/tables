# Markdown

This library comes with a simple markdown table builder as well.

It can come in handy if you are building CLI tables, but also would like to save them somewhere as markdown while at it (eg. benchmark results).

## Example

```ts
import { markdown } from '@monstermann/tables'

const result = markdown.createTable({
    columns: ['foo', 'bar'],
    rows: [
        { foo: 'Foo', bar: 'Bar' },
    ],
})

console.log(result)
```

## Options

Supports a subset of [CLI options](./cli.md#options):

```ts
import { markdown } from '@monstermann/tables'

markdown.createTable({
    // Configure the keys of your columns and define their order:
    columns: ['foo', 'bar'],
    // Provide the data for your rows:
    rows: [{ foo: 'Foo column content', bar: 'Bar column content' }],

    // Set a maxWidth for truncation: (default: Infinity)
    maxWidth: 100,
    // Add paddings to each column: (default: 2)
    padding: 2,

    // Define the default alignment for all columns: (default: 'left')
    columnAlignment: 'left',
    // Define the alignment for specific columns: ('left' | 'center' | 'right')
    columnAlignments: { foo: 'right' },

    // Define the default alignment for all header columns: (default: 'center')
    headerAlignment: 'center',
    // Define the alignment for specific header columns: ('left' | 'center' | 'right')
    headerAlignments: { foo: 'center' },

    // Customize the titles for each header, by default `columns` is taken as-is:
    headerTitles: { bar: 'Bar' },
})
```

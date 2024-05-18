# CLI

## Example

```ts
import { cli } from '@monstermann/tables'

const result = cli.createTable({
    columns: ['foo', 'bar'],
    rows: [
        { foo: 'Foo', bar: 'Bar' },
    ],
})

console.log(result)
```

## Options

`createTable` comes with a bunch of options that should cover most basic needs.

Check out ["Advanced"](#advanced) if you need more control!

```ts
import { cli } from '@monstermann/tables'

cli.createTable({
    // Configure the keys of your columns and define their order:
    columns: ['foo', 'bar'],
    // Provide the data for your rows:
    rows: [{ foo: 'Foo column content', bar: 'Bar column content' }],

    // Set a custom stdout, used to truncate the table to fit on screen:
    stdout: process.stdout,
    // Force a custom max-width instead of relying on stdout: (default: undefined)
    maxWidth: 100,

    // Enable/disable the header row: (default: true)
    useHeader: true,
    // Enable/disable the top-most border row: (default: true)
    useTopBorder: true,
    // Enable/disable the bottom-most border row: (default: true)
    useBottomBorder: true,
    // Enable/disable the left-most border on each row: (default: true)
    useLeftBorder: true,
    // Enable/disable the right-most border on each row: (default: true)
    useRightBorder: true,
    // Enable/disable the border between each column: (default: true)
    useDividerBorder: true,
    // Enable/disable the border row between the header and first row: (default: true)
    useHeaderSeparator: true,
    // Enable/disable the border row between each row: (default: false)
    useRowSeparator: false,

    // Add paddings to each column: (default: 2)
    padding: 2,
    // Define the default alignment for all columns: (default: 'left')
    columnAlignment: 'left',
    // Define the alignment for specific columns: ('left' | 'center' | 'right')
    columnAlignments: { foo: 'right' },
    // Define the default style for all columns: (default: [])
    columnStyle: ['blue'],
    // Define the styles for specific columns: (default: {})
    columnStyles: { foo: ['bold'] },
    // Define the default alignment for all header columns: (default: 'center')
    headerAlignment: 'center',
    // Define the alignment for specific header columns: ('left' | 'center' | 'right')
    headerAlignments: { foo: 'center' },
    // Customize the titles for each header, by default `columns` is taken as-is:
    headerTitles: { bar: 'Bar' },
    // Define the default style for all headers: (default: ['bold'])
    headerStyle: ['bold'],
    // Define the styles for specific header columns: (default: {})
    headerStyles: { foo: ['red'] },
    // Define the style for all borders: (default: ['dim'])
    borderStyle: ['dim'],
    // Customize the borders:
    borders: {
        top: '─',
        topLeft: '┌',
        topRight: '┐',
        topDivider: '┬',

        bottom: '─',
        bottomLeft: '└',
        bottomRight: '┘',
        bottomDivider: '┴',

        left: '│',
        right: '│',
        divider: '│',

        separator: '─',
        separatorLeft: '├',
        separatorRight: '┤',
        separatorDivider: '┼',
    },
})
```

## Alignments

Here are the valid `alignment`s:

- `'left'`
- `'center'`
- `'right'`

## Styles

This library uses [picocolors](https://github.com/alexeyraspopov/picocolors) under the hood, here are all the possible styles you can use:

```ts
const style = [
    'bold',
    'dim',
    'italic',
    'underline',
    'inverse',
    'hidden',
    'strikethrough',
    'black',
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white',
    'gray',
    'bgBlack',
    'bgRed',
    'bgGreen',
    'bgYellow',
    'bgBlue',
    'bgMagenta',
    'bgCyan',
    'bgWhite',
]
```

## Advanced

This library exposes functions that construct new cells & rows, meaning you can customize in high detail how each cell & row should look like.

Here is an example of what this looks like:

```ts
import { cli, renderRows } from '@monstermann/tables'

// Similar to the above `createTable`, but in this case just carries global default configuration,
// so you don't have to pass a million options to every single row:
const config = cli.createConfig({
    columns: ['foo', 'bar'],
    // As an example, let's set the default alignment for all rows:
    alignment: 'center',
})

const rows = [
    // Build your table by creating new rows, headers, etc:
    cli.createRow(config, { foo: 'Foo', bar: 'Bar' }, {
        // An example for overwriting the default alignment from above:
        alignment: 'left',
    }),
]

// Now build the string!
const result = renderRows(rows, maxWidth)
```

### `createConfig`

Constructs the base configuration that should be used by all rows. These can be overwritten by all `createXYZ` functions.

```ts
import { cli } from '@monstermann/tables'

const config = cli.createConfig({
    // Configure the keys of your columns and define their order:
    columns: ['foo', 'bar'],

    // Add paddings to each column:
    padding: 2,
    // Define the default alignment for all columns:
    columnAlignment: 'left',
    // Define the alignment for specific columns:
    columnAlignments: { foo: 'right' },
    // Define the default style for all columns:
    columnStyle: ['blue'],
    // Define the styles for specific columns:
    columnStyles: { foo: ['bold'] },
    // Define the default alignment for all header columns:
    headerAlignment: 'center',
    // Define the alignment for specific header columns:
    headerAlignments: { foo: 'center' },
    // Customize the titles for each header, by default `columns` is taken as-is:
    headerTitles: { bar: 'Bar' },
    // Define the default style for all headers:
    headerStyle: ['bold'],
    // Define the styles for specific header columns:
    headerStyles: { foo: ['red'] },
    // Define the style for all borders:
    borderStyle: ['dim'],
    // Customize the borders:
    borders: {
        top: '─',
        topLeft: '┌',
        topRight: '┐',
        topDivider: '┬',

        bottom: '─',
        bottomLeft: '└',
        bottomRight: '┘',
        bottomDivider: '┴',

        left: '│',
        right: '│',
        divider: '│',

        separator: '─',
        separatorLeft: '├',
        separatorRight: '┤',
        separatorDivider: '┼',
    },
})
```

### `createHeader`

Creates a new row containing the titles of each column.

```ts
import { cli } from '@monstermann/tables'

const row = cli.createHeader(config, {
    // Overwrite `config.headerTitles`: (optional)
    titles: {},
    // Overwrite `config.borders.left`: (optional)
    borderLeft: '',
    // Overwrite `config.borders.right`: (optional)
    borderRight: '',
    // Overwrite `config.borders.divider`: (optional)
    borderDivider: '',
    // Overwrite `config.borderStyle`: (optional)
    borderStyle: [],
    // Overwrite `config.headerAlignment`: (optional)
    alignment: 'center',
    // Overwrite `config.headerAlignments`: (optional)
    alignments: {},
    // Overwrite `config.headerStyle`: (optional)
    style: [],
    // Overwrite `config.headerStyles`: (optional)
    styles: {},
})
```

### `createRow`

Creates a new row.

```ts
import { cli } from '@monstermann/tables'

const row = cli.createRow(config, {
    // Define the row data:
    row: { foo: 'Foo', bar: 'Bar' },

    // Overwrite `config.borders.left`: (optional)
    borderLeft: '',
    // Overwrite `config.borders.right`: (optional)
    borderRight: '',
    // Overwrite `config.borders.divider`: (optional)
    borderDivider: '',
    // Overwrite `config.borderStyle`: (optional)
    borderStyle: [],
    // Overwrite `config.columnAlignment`: (optional)
    alignment: 'center',
    // Overwrite `config.columnAlignments`: (optional)
    alignments: {},
    // Overwrite `config.columnStyle`: (optional)
    style: [],
    // Overwrite `config.columnStyles`: (optional)
    styles: {},
})
```

### `createRowSeparator`

Creates a border row intended to be inserted between rows.

```ts
import { cli } from '@monstermann/tables'

const row = cli.createRowSeparator(config, {
    // Overwrite `config.borders.separator`: (optional)
    default: '',
    // Overwrite `config.borders.separatorLeft`: (optional)
    left: '',
    // Overwrite `config.borders.separatorRight`: (optional)
    right: '',
    // Overwrite `config.borders.separatorDivider`: (optional)
    divider: '',
    // Overwrite `config.borderStyle`: (optional)
    style: [],
})
```

### `createBorderTop`

Creates a border row intended to be inserted at the very top.

```ts
import { cli } from '@monstermann/tables'

const row = cli.createBorderTop(config, {
    // Overwrite `config.borders.top`: (optional)
    default: '',
    // Overwrite `config.borders.topLeft`: (optional)
    left: '',
    // Overwrite `config.borders.topRight`: (optional)
    right: '',
    // Overwrite `config.borders.topDivider`: (optional)
    divider: '',
    // Overwrite `config.borderStyle`: (optional)
    style: [],
})
```

### `createBorderBottom`

Creates a border row intended to be inserted at the very bottom.

```ts
import { cli } from '@monstermann/tables'

const row = cli.createBorderBottom(config, {
    // Overwrite `config.borders.bottom`: (optional)
    default: '',
    // Overwrite `config.borders.bottomLeft`: (optional)
    left: '',
    // Overwrite `config.borders.bottomRight`: (optional)
    right: '',
    // Overwrite `config.borders.bottomDivider`: (optional)
    divider: '',
    // Overwrite `config.borderStyle`: (optional)
    style: [],
})
```

### `createBorder`

Creates a new border row - this is what is used by `createBorderTop`, `createBorderBottom` and `createRowSeparator`:

```ts
import { cli } from '@monstermann/tables'

const row = cli.createBorder(config, {
    // Define the default character to use:
    default: '',
    // Overwrite `config.borders.left`: (optional)
    left: '',
    // Overwrite `config.borders.right`: (optional)
    right: '',
    // Overwrite `config.borders.divider`: (optional)
    divider: '',
    // Overwrite `config.borderStyle`: (optional)
    style: [],
})
```

### `createCell`

Creates a new [Cell](./core.md#cell) that you can use to manually build a row (`Row = Cell[]`).

```ts
import { cli } from '@monstermann/tables'

const cell = createCell({
    // The text content that should be displayed:
    content: '',
    // The padding to apply to either side: (default: 0)
    padding: 2,
    // The character to use for paddings: (default: ' ')
    paddingChar: ' ',
    // The character that should be used to align the columns: (default: ' ')
    fillChar: ' ',
    // The character that should be used as the truncation ellipsis: (default: '…')
    truncationChar: '…',
    // The border character that should be placed on the left side: (default: '')
    borderLeft: '',
    // The border character that should be placed on the right side: (default: '')
    borderRight: '',
    // The style that should be applied to borders: (default: [])
    borderStyle: [],
    // The style that should be applied to the content, paddingChar, fillChar and truncationChar: (default: [])
    style: [],
})
```

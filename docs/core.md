# Core

Here are the core building blocks that are used to provide the cli and markdown renderers:

### `Cell`

A cell is a record that describes a single cell/column, most building blocks such as `createHeader`, `createRow`, or `createBorder` are just wrappers to create these cells.

Note that texts can contain unicode and ANSI escape codes!

```ts
type Cell = {
    // The text content for this cell. This is the part that will be aligned or truncated as necessary.
    content: string

    // Decorations that should be placed on either side. These parts are considered as reserved and will
    // not be aligned, truncated, or anything else. This is where things such as borders or paddings go.
    left: string[]
    right: string[]

    // The ellipsis that should be used for truncation. You can set this to an empty string if needed.
    truncationChar: string

    // Defines the alignment.
    alignment: 'left' | 'center' | 'right'
    // The character that should be used to align the cell.
    fillChar: string
}
```

### `renderRows`

Takes in a list of rows (`Cell[][]`), the desired column widths and renders all cells.

The implementation is [~50 LOC](../src/renderRows.ts) if you need to roll your own!

```ts
import { renderRows } from '@monstermann/tables'

const widths = [100, 100, 100]

const rows = [
    [Cell, Cell, Cell],
    [Cell, Cell, Cell],
    [Cell, Cell, Cell],
]

const result: string = renderRows(rows, widths)

console.log(result)
```

### `renderCell`

Renders a single cell given the desired width, truncating or expanding as needed.

The implementation is [~48 LOC](../src/renderCell.ts) if you need to roll your own!

```ts
import { renderCell } from '@monstermann/tables'

const width = 100

const result: string = renderCell(cell, width)

console.log(result)
```

### `getCellContentWidth`

Returns the width of a cell's text content, uses [`string-width`](https://github.com/sindresorhus/string-width) under the hood to consider unicode and ANSI escape codes:

```ts
import { getCellContentWidth } from '@monstermann/tables'

const width: number = getCellContentWidth(cell)
```

### `getCellDecorationsWidth`

Returns the width of a cell's decorations, uses [`string-width`](https://github.com/sindresorhus/string-width) under the hood to consider unicode and ANSI escape codes:

```ts
import { getCellDecorationsWidth } from '@monstermann/tables'

const width: number = getCellDecorationsWidth(cell)
```

### `getCellWidth`

Returns the width of a cell's text content and decorations, uses [`string-width`](https://github.com/sindresorhus/string-width) under the hood to consider unicode and ANSI escape codes:

```ts
import { getCellWidth } from '@monstermann/tables'

const width: number = getCellWidth(cell)
```

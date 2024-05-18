import process from 'node:process'
import type { Borders, Cell, CreateCliTableConfig } from '../types.js'
import { map } from '../helpers/map.js'
import { renderRows } from '../renderRows.js'
import { borders } from './borders.js'
import { createBorderBottom } from './createBorderBottom.js'
import { createBorderTop } from './createBorderTop.js'
import { createHeader } from './createHeader.js'
import { createRow } from './createRow.js'
import { createRowSeparator } from './createRowSeparator.js'
import { createConfig } from './createConfig.js'

export function createTable<T extends string>(options: CreateCliTableConfig<T>): string {
    const t = createConfig({
        ...options,
        padding: options.padding ?? 2,
        borderStyle: options.borderStyle ?? ['dim'],
        headerStyle: options.headerStyle ?? ['bold'],
        headerAlignment: options.headerAlignment ?? 'center',
        borders: removeBorders(options.borders ?? borders.round, [
            ...(options.useLeftBorder === false ? ['left', 'topLeft', 'bottomLeft', 'separatorLeft'] as const : []),
            ...(options.useRightBorder === false ? ['right', 'topRight', 'bottomRight', 'separatorRight'] as const : []),
            ...(options.useDividerBorder === false ? ['divider', 'topDivider', 'bottomDivider', 'separatorDivider'] as const : []),
        ]),
    })

    const rows: Cell[][] = []

    if (options.useTopBorder !== false)
        rows.push(createBorderTop(t))

    if (options.useHeader !== false)
        rows.push(createHeader(t))

    if (options.useHeader !== false && options.useHeaderSeparator !== false)
        rows.push(createRowSeparator(t))

    map(options.rows, (row, _, isLast) => {
        rows.push(createRow(t, row))
        if (options.useRowSeparator === true && !isLast)
            rows.push(createRowSeparator(t))
    })

    if (options.useBottomBorder !== false)
        rows.push(createBorderBottom(t))

    const maxWidth = options.maxWidth ?? (options.stdout ?? process.stdout).columns
    return renderRows(rows, maxWidth)
}

function removeBorders(borders: Borders, keys: (keyof Borders)[]): Borders {
    const copy = { ...borders }
    for (const key of keys) copy[key] = ''
    return copy
}

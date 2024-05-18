import { map } from '../helpers/map.js'
import { renderRows } from '../renderRows.js'
import type { Cell, MarkdownToTableConfig } from '../types.js'

export function createTable<T extends string>(options: MarkdownToTableConfig<T>): string {
    const padding = options.padding ?? 2
    const p = ' '.repeat(options.padding ?? 2)

    const headerRow = map(options.columns, (name, _, isLast): Cell => ({
        content: options.headerTitles?.[name] ?? name,
        alignment: options.headerAlignments?.[name] ?? options.headerAlignment ?? 'center',
        truncationChar: '…',
        fillChar: ' ',
        left: ['|', p],
        right: [p, isLast ? '|' : ''],
    }))

    const separatorRow = map(options.columns, (name, _, isLast): Cell => {
        const alignment = options.columnAlignments?.[name] ?? options.columnAlignment ?? 'left'
        const signLeft = alignment === 'center' ? ':' : ''
        const signRight = alignment !== 'left' ? ':' : ''
        const p = '-'.repeat(padding)
        return {
            content: '',
            alignment: 'left',
            truncationChar: '',
            fillChar: '-',
            left: ['|', signLeft, p],
            right: [p, signRight, isLast ? '|' : ''],
        }
    })

    const bodyRows = options.rows.map((rowData) => {
        return map(options.columns, (name, _, isLast): Cell => ({
            content: rowData[name],
            alignment: options.columnAlignments?.[name] ?? options.columnAlignment ?? 'left',
            truncationChar: '…',
            fillChar: ' ',
            left: ['|', p],
            right: [p, isLast ? '|' : ''],
        }))
    })

    const rows = [headerRow, separatorRow, ...bodyRows]
    return renderRows(rows, options.maxWidth ?? Infinity)
}

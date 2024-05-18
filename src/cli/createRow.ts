import { map } from '../helpers/map.js'
import type { Alignment, Alignments, Cell, CliConfig, Style, Styles } from '../types.js'
import { createCell } from './createCell.js'

export function createRow<T extends string>(
    tableConfig: CliConfig<T>,
    row: Record<T, string>,
    rowConfig: Partial<{
        borderLeft: string
        borderRight: string
        borderDivider: string
        borderStyle: Style[]
        alignments: Alignments<T>
        alignment: Alignment
        styles: Styles<T>
        style: Style[]
    }> = {},
): Cell[] {
    const [t, r] = [tableConfig, rowConfig]
    return map(t.columns, (name, isFirst, isLast) => createCell({
        content: row[name],
        padding: t.padding,
        alignment: r.alignments?.[name] ?? r.alignment ?? t.columnAlignments?.[name] ?? t.columnAlignment,
        borderLeft: isFirst ? (r.borderLeft ?? t.borders?.left) : (r.borderDivider ?? t.borders?.divider),
        borderRight: isLast ? (r.borderRight ?? t.borders?.right) : '',
        borderStyle: r.borderStyle ?? t.borderStyle,
        style: r.styles?.[name] ?? r.style ?? t.columnStyles?.[name] ?? t.columnStyle,
    }))
}

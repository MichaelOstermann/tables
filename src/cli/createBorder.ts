import { map } from '../helpers/map.js'
import type { Cell, CliConfig, Style } from '../types.js'
import { createCell } from './createCell.js'

export function createBorder<T extends string>(
    tableConfig: CliConfig<T>,
    rowConfig: Partial<{
        default: string
        left: string
        right: string
        divider: string
        style: Style[]
    }> = {},
): Cell[] {
    const [t, r] = [tableConfig, rowConfig]
    return map(t.columns, (_, isFirst, isLast) => createCell({
        content: '',
        padding: t.padding,
        truncationChar: '',
        paddingChar: r.default ?? '',
        fillChar: r.default ?? '',
        borderLeft: isFirst ? r.left : r.divider,
        borderRight: isLast ? r.right : '',
        style: r.style ?? t.borderStyle,
        borderStyle: r.style ?? t.borderStyle,
    }))
}

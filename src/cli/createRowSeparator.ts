import type { Cell, CliConfig, Style } from '../types.js'
import { createBorder } from './createBorder.js'

export function createRowSeparator<T extends string>(
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
    return createBorder(t, {
        default: r.default ?? t.borders?.separator,
        left: r.left ?? t.borders?.separatorLeft,
        right: r.right ?? t.borders?.separatorRight,
        divider: r.divider ?? t.borders?.separatorDivider,
        style: r.style,
    })
}

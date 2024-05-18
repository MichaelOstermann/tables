import type { Cell, CliConfig, Style } from '../types.js'
import { createBorder } from './createBorder.js'

export function createBorderTop<T extends string>(
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
        default: r.default ?? t.borders?.top,
        left: r.left ?? t.borders?.topLeft,
        right: r.right ?? t.borders?.topRight,
        divider: r.divider ?? t.borders?.topDivider,
        style: r.style,
    })
}

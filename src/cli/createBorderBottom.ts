import type { Cell, CliConfig, Style } from '../types.js'
import { createBorder } from './createBorder.js'

export function createBorderBottom<T extends string>(
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
        default: r.default ?? t.borders?.bottom,
        left: r.left ?? t.borders?.bottomLeft,
        right: r.right ?? t.borders?.bottomRight,
        divider: r.divider ?? t.borders?.bottomDivider,
        style: r.style,
    })
}

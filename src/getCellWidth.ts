import type { Cell } from './types.js'
import { getCellContentWidth } from './getCellContentWidth.js'
import { getCellDecorationsWidth } from './getCellDecorationsWidth.js'

export function getCellWidth(cell: Cell): number {
    return getCellContentWidth(cell)
        + getCellDecorationsWidth(cell)
}

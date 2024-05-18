import stringWidth from 'string-width'
import type { Cell } from './types.js'

export function getCellDecorationsWidth(cell: Cell): number {
    return stringWidth(cell.left.join(''))
        + stringWidth(cell.right.join(''))
}

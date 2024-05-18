import stringWidth from 'string-width'
import type { Cell } from './types.js'

export function getCellContentWidth(cell: Cell): number {
    return stringWidth(cell.content)
}

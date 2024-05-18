import type { Cell } from './types.js'
import { renderCell } from './renderCell.js'
import { getCellWidth } from './getCellWidth.js'

export function renderRows(
    rows: Cell[][],
    maxWidth: number,
): string {
    const targetWidths = getTargetWidths(rows, maxWidth)

    return rows
        .map(row => row.map((cell, idx) => renderCell(cell, targetWidths[idx])).join(''))
        .join('\n')
}

function getTargetWidths(
    rows: Cell[][],
    maxWidth: number,
): number[] {
    const availableWidth = maxWidth
    const columnWidths = getColumnWidths(rows)

    while (isOverflowing(columnWidths, availableWidth))
        shrinkWidestColumn(columnWidths)

    return columnWidths
}

function getColumnWidths(rows: Cell[][]): number[] {
    const result: number[] = []

    rows.forEach(row => row.forEach((cell, cellIdx) => {
        result[cellIdx] = Math.max(result[cellIdx] ?? 0, getCellWidth(cell))
    }))

    return result
}

function isOverflowing(
    widths: number[],
    availableWidth: number,
): boolean {
    return widths.reduce((a, b) => a + b, 0) > availableWidth
}

function shrinkWidestColumn(
    widths: number[],
): void {
    const max = widths.reduce((a, b) => Math.max(a, b), 0)
    const idx = widths.indexOf(max)
    widths[idx] -= 1
}

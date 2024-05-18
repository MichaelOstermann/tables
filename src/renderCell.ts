import cliTruncate from 'cli-truncate'
import type { Cell } from './types.js'
import { getCellDecorationsWidth } from './getCellDecorationsWidth.js'
import { getCellContentWidth } from './getCellContentWidth.js'

const alignmentStrategies = {
    left: (text: string, char: string, diff: number): string => `${text}${char.repeat(diff)}`,
    right: (text: string, char: string, diff: number): string => `${char.repeat(diff)}${text}`,
    center: (text: string, char: string, diff: number): string => `${char.repeat(Math.floor(diff / 2))}${text}${char.repeat(Math.ceil(diff / 2))}`,
}

const positionMap = {
    left: 'end',
    right: 'start',
    center: 'end',
} as const

export function renderCell(
    cell: Cell,
    targetWidth: number = Infinity,
): string {
    targetWidth = targetWidth - getCellDecorationsWidth(cell)
    if (targetWidth <= 0) return ''

    const width = getCellContentWidth(cell)
    let content = cell.content

    if (width > targetWidth) {
        content = cliTruncate(content, targetWidth, {
            position: positionMap[cell.alignment],
            truncationCharacter: cell.truncationChar,
        })
    }

    if (width < targetWidth) {
        content = alignmentStrategies[cell.alignment](
            content,
            cell.fillChar,
            targetWidth - width,
        )
    }

    const left = cell.left.join('')
    const right = cell.right.join('')
    content = `${left}${content}${right}`

    return content
}

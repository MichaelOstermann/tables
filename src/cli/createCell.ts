import type { Alignment, Cell, Style } from '../types.js'
import { style } from './style.js'

export function createCell(o: {
    content: string
    padding?: number
    paddingChar?: string
    fillChar?: string
    truncationChar?: string
    alignment?: Alignment
    borderLeft?: string
    borderRight?: string
    borderStyle?: Style[]
    style?: Style[]
}): Cell {
    return {
        content: style(o.content, o.style),
        alignment: o.alignment ?? 'left',
        fillChar: style(o.fillChar ?? ' ', o.style),
        truncationChar: style(o.truncationChar ?? '…', o.style),
        left: [
            style(o.borderLeft ?? '', o.borderStyle),
            style((o.paddingChar ?? ' ').repeat(o.padding ?? 0), o.style),
        ],
        right: [
            style((o.paddingChar ?? ' ').repeat(o.padding ?? 0), o.style),
            style(o.borderRight ?? '', o.borderStyle),
        ],
    }
}

import picocolors from 'picocolors'
import type { Style } from '../types.js'

export function style(value: string, style: Style[] = []): string {
    if (value.length === 0) return value
    if (style.length === 0) return value
    return style.reduce((value, style) => picocolors[style](value), value)
}

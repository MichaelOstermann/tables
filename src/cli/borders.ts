import type { Borders } from '../types.js'

const single: Borders = {
    top: '─',
    topLeft: '┌',
    topRight: '┐',
    topDivider: '┬',

    bottom: '─',
    bottomLeft: '└',
    bottomRight: '┘',
    bottomDivider: '┴',

    left: '│',
    right: '│',
    divider: '│',

    separator: '─',
    separatorLeft: '├',
    separatorRight: '┤',
    separatorDivider: '┼',
}

const round: Borders = {
    ...single,
    topLeft: '╭',
    topRight: '╮',
    bottomLeft: '╰',
    bottomRight: '╯',
}

const none = {
    top: '',
    topLeft: '',
    topRight: '',
    topDivider: '',

    bottom: '',
    bottomLeft: '',
    bottomRight: '',
    bottomDivider: '',

    left: '',
    right: '',
    divider: '',

    separator: '',
    separatorLeft: '',
    separatorRight: '',
    separatorDivider: '',
}

export const borders = {
    single,
    round,
    none,
}

import type { Colors } from 'picocolors/types.js'

export type Alignment = 'left' | 'right' | 'center'
export type Alignments<T extends string> = Partial<Record<T, Alignment>>
export type Style = keyof Omit<Colors, 'isColorSupported' | 'reset'>
export type Styles<T extends string> = Partial<Record<T, Style[]>>

export type Cell = {
    content: string
    left: string[]
    right: string[]
    truncationChar: string
    alignment: Alignment
    fillChar: string
}

export type Borders = {
    top: string
    topLeft: string
    topRight: string
    topDivider: string

    bottom: string
    bottomLeft: string
    bottomRight: string
    bottomDivider: string

    left: string
    right: string
    divider: string

    separator: string
    separatorLeft: string
    separatorRight: string
    separatorDivider: string
}

export type CliConfig<T extends string> = {
    columns: T[]
    padding?: number

    columnAlignments?: Alignments<T>
    columnAlignment?: Alignment

    headerAlignments?: Alignments<T>
    headerAlignment?: Alignment

    headerTitles?: Partial<Record<T, string>>
    headerStyles?: Styles<T>
    headerStyle?: Style[]

    columnStyles?: Styles<T>
    columnStyle?: Style[]

    borders?: Borders
    borderStyle?: Style[]
}

export type CreateCliTableConfig<T extends string> = CliConfig<T> & {
    rows: Record<T, string>[]
    maxWidth?: number
    stdout?: NodeJS.WriteStream
    useHeader?: boolean
    useTopBorder?: boolean
    useBottomBorder?: boolean
    useLeftBorder?: boolean
    useRightBorder?: boolean
    useDividerBorder?: boolean
    useHeaderSeparator?: boolean
    useRowSeparator?: boolean
}

export type MarkdownToTableConfig<T extends string> = Record<string, any> & {
    columns: T[]
    rows: Record<T, string>[]

    padding?: number
    maxWidth?: number

    columnAlignments?: Alignments<T>
    columnAlignment?: Alignment

    headerAlignments?: Alignments<T>
    headerAlignment?: Alignment

    headerTitles?: Partial<Record<T, string>>
}

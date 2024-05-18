import type { CliConfig } from '../types.js'

export function createConfig<T extends string>(tableConfig: CliConfig<T>): CliConfig<T> {
    return tableConfig
}

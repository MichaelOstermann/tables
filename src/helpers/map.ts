export function map<T, U>(
    list: T[],
    fn: (value: T, isFirst: boolean, isLast: boolean) => U,
): U[] {
    return list.map((value, idx) => {
        return fn(value, idx === 0, idx === list.length - 1)
    })
}

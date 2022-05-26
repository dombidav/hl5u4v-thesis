export function diff<T, K = T>(arr1: T[], arr2: K[]): (T | K)[] {
    const result: (T | K)[] = []
    const set1 = new Set<T | K>(arr1)
    const set2 = new Set<T | K>(arr2)
    const union = new Set([...set1, ...set2])
    const intersection = new Set([...set1].filter((x) => set2.has(x)))
    const difference = new Set([...union].filter((x) => !intersection.has(x)))
    for (const item of difference) {
        if (set1.has(item)) {
            result.push(item as T)
        } else {
            result.push(item as K)
        }
    }
    return result
}

export function sub<T>(arr1: T[], arr2: T[]): T[] {
    return arr1.filter((x) => !arr2.includes(x))
}

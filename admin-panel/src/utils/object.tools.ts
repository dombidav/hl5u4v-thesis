export interface Omit2 {
    <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
        [K2 in Exclude<keyof T, K[number]>]: T[K2]
    }
}

export const omit: Omit2 = (obj, ...keys) => {
    const result = {} as {
        [K in keyof typeof obj]: typeof obj[K]
    }
    let key: keyof typeof obj
    for (key in obj) {
        if (keys.includes(key)) continue

        if (typeof obj[key] !== 'object') {
            result[key] = obj[key]
            continue
        }

        let str = obj[key].toString().trim()
        console.log(`Working on ${key}: ${str}`)
        const match = str.match(/[a-z]+ [a-z]+ \d\d \d\d\d\d \d\d:\d\d:\d\d GMT\+\d\d\d\d/gi)
        if (!match) {
            result[key] = obj[key]
            continue
        }
        str = (obj[key] as unknown as Date).toISOString().slice(0, 19).replace('T', ' ')
        console.log('str', str)
        result[key] = str as any
    }
    return result
}

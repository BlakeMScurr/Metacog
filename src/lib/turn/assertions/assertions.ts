// index assertion functions
export function assertNaturalNumber(i: number) {
    if (Math.floor(i) != i) throw new Error (`non integer index ${i}`)
    if (i < 0) throw new Error(`negative index ${i}`)
}

export function assertNoRepeats(numbers: Array<number>) {
    if (new Set(numbers).size < numbers.length) throw new Error("repeated index")
}

export function assertIndexInRange(i: number, wordList: Array<any>) {
    if (i >= wordList.length) throw new Error(`index ${i} out of range (max ${wordList.length - 1})`)
}

export function assertValidCardPair(pair: [number, number]) {
    if (pair.length != 2) throw new Error(`Pairs contain 2 cards`)
    assertNoRepeats(pair)
    pair.forEach(i => {
        assertNaturalNumber(i)
        assertIndexInRange(i, Array(3))
    })
}
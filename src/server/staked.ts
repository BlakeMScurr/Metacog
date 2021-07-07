let challenges: Map<string, boolean> = new Map()

export function newStakedRoom(address: string) {
    challenges.set(address, true)
}
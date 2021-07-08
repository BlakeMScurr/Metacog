// Making a challenge lasts for 2 minutes
export const challengeExpiration = 1000 * 60 * 2

let challenges: Map<string, boolean> = new Map()

export function addChallenge(challenger: string) {
    challenges.set(challenger, true)
}

export function deleteChallenger(challenger: string) {
    challenges.delete(challenger)
}

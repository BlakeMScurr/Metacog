import { addChallenge, challengeExpiration, deleteChallenger } from "../../server/staked"

export async function get({ query }) {
    let challenger = query.get("challenger")
    addChallenge(challenger)
    let createdAt = Date.now()
    setTimeout(() => {
        deleteChallenger(challenger)
    }, challengeExpiration)

    return {
        body: {
            createdAt: createdAt
        }
    }
}
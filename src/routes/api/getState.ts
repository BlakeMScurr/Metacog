import { getRoomState } from '../../server/server';

export async function get({ query }) {
    let a = query.get("a")
    let b = query.get("b")

    return {
        body: {
            state: getRoomState(a + b),
        }
    }
}
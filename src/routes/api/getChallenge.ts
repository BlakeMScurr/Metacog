import { getRoom } from "../../server/staked";

export async function get({ query }) {
    let roomState = getRoom(query.get("room"))
    if (roomState) {
        return {
            body: roomState
        }
    }
}
import { newStakedRoom } from "src/server/staked";
import { newRoom } from "../../server/server";

export async function get({ query }) {
    if (query.get("staked")) {
        return {
            body: {
                "roomCode": newStakedRoom(query.get("address")),
            }
        }

    } else {
        return {
            body: {
                "roomCode": newRoom(),
            }
        };
    }
}
import { newRoom } from "../../server/server";

export async function get() {
    return {
        body: {
            "roomCode": newRoom(),
        }
    };
}
import { makeid } from "$lib/util";

export async function get() {
    return {
        body: {
            "roomCode": makeid(4),
        }
    };
}
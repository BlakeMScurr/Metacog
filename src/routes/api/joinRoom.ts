import * as jwt from 'jsonwebtoken';
import { joinRoom, roomState } from '../../server/server';

const salt = `this is probably a bad salt, partly because I don't really get how JWTs work, and partly because it's visible in the repo :)))))`

export async function get({ query }) {
    let room = query.get("room")

    let state = joinRoom(room)
    if (state !== roomState.full) {
        let playerA = state === roomState.empty // you're player A if the room was empty before
        return {
            body: {
                "jwt": jwt.sign({room: room, playerA: playerA }, salt),
                "playerA": playerA,
            }
        };
    }
}
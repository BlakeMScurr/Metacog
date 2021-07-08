import * as jwt from 'jsonwebtoken';
import { joinRoom, roomState, salt } from '../../server/server';

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
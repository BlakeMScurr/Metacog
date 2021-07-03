import * as jwt from 'jsonwebtoken';
import { getRoomState, salt } from '../../server/server';


export async function get({ query }) {
    let room = query.get("room")
    let token = query.get("jwt")

    let decoded = jwt.verify(token, salt)

    if (decoded.room === room) {
        console.log("returning", getRoomState(room))
        return {
            body: {
                state: JSON.stringify(getRoomState(room)),
            }
        }
    }
    // let state = joinRoom(room)
    // if (state !== roomState.full) {
    //     let playerA = state === roomState.empty // you're player A if the room was empty before
    //     return {
    //         body: {
    //             "jwt": jwt.sign({room: room, playerA: playerA }, salt),
    //             "playerA": playerA,
    //         }
    //     };
    // }
}
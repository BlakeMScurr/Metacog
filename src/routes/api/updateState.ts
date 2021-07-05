import { castTurn } from '$lib/turn/turn';
import { player } from '$lib/util';
import * as jwt from 'jsonwebtoken';
import { salt, updateRoomState } from '../../server/server';

export async function post({ body, query }) {
    let decoded = jwt.verify(query.get("jwt"), salt)

    console.log(`updating state as player A ${decoded.playerA}, while player of the new turn is ${player(body.turn)}`)
    console.log(`am I updating the state? ${(player(body.turn) === "A") === decoded.playerA}`)

    if ((player(body.turn) === "A") === decoded.playerA) {
        try {
            updateRoomState(decoded.room, castTurn(body))
            return {body: {}}
        } catch (e) {
            console.log(e)
        }
    }

}
import { player } from '$lib/util';
import * as jwt from 'jsonwebtoken';
import { salt, updateRoomState } from '../../server/server';

export async function post({ body, query }) {
    let decoded = jwt.verify(query.get("jwt"), salt)

    if ((player(body.turn) === "A") === decoded.playerA) {
        updateRoomState(decoded.room, body)        
    }

    return {
        body: {},
    }


}
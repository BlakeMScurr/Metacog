import * as jwt from 'jsonwebtoken';
import { getRoomState, salt } from '../../server/server';


export async function get({ query }) {
    let room = query.get("room")
    let token = query.get("jwt")

    let decoded = jwt.verify(token, salt)

    if (decoded.room === room) {
        return {
            body: {
                state: JSON.stringify(getRoomState(room)),
            }
        }
    }
}
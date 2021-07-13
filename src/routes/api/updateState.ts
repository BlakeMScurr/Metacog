import { castTurn } from '$lib/turn/turn';
import { myTurn, player } from '$lib/util';
import { ethers } from 'ethers';
import { updateRoomState } from '../../server/server';

export async function post({ body, query }) {
    let a = query.get("a")
    let b = query.get("b")
    let state = body.state

    let verification = ethers.utils.verifyMessage(JSON.stringify(state), body.signature)

    if ((verification === a || verification === b) && myTurn(state.turn, verification === a)) {
        try {
            updateRoomState(a + b, castTurn(state))
            return {body: {}}
        } catch (e) {
            console.log(e)
        }
    }
}
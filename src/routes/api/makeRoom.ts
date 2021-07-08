import { newStakedRoom } from "../../server/staked";
import { ethers } from "ethers";

export async function post({ body }) {
    let address = ethers.utils.verifyMessage(JSON.stringify(body.message), body.signature)
    newStakedRoom(address, body)
    return {
        body: {}
    }
}
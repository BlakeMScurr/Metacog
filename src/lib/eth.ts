import { ethers } from "ethers";

export async function newProvider():Promise<ethers.providers.Web3Provider> {
    if (!window.ethereum) throw new Error("No wallet connected :'(")
    return new ethers.providers.Web3Provider(window.ethereum)
}

export async function signNonce() {
    let signer = await (await newProvider()).getSigner()
    let response = await fetch(`api/nonce`)
    let json = await response.json()

    const message = `nobotic.xyz nonce: ${json.nonce}`
    const msgHash = ethers.utils.hashMessage(message);
    const msgHashBytes = ethers.utils.arrayify(msgHash);
    return {signature: await signer.signMessage(message), msgHashBytes: msgHashBytes}
}

import { ethers } from "ethers";

let providerCache
export async function ethereumProvider():Promise<ethers.providers.Web3Provider> {
    if (!providerCache) {
        if (!window.ethereum) throw new Error("No wallet connected :'(")
        window.ethereum.enable()
        providerCache = new ethers.providers.Web3Provider(window.ethereum)
    }
    return providerCache
}

export async function signAction(provider: ethers.providers.Web3Provider, a: action) {
    let stringMessage = JSON.stringify(a)
    let signer = await provider.getSigner()
    return new signedAction(a, await signer.signMessage(stringMessage))
}
export class signedAction {
    action: action
    signature: string

    constructor(a: action, signature: string) {
        this.action = a
        this.signature = signature       
    }
}

export class action {
    host: string
    action: string
    expiry: number
    data: any
    previous: action

    constructor(action: string, previous?: action, data?: any) {
        this.host = "nobotic.xyz"
        this.action = action
        this.expiry = Date.now() + 2 * 60 * 1000
        this.data = data
        this.previous = previous
    }
}

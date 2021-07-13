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

export async function sign(provider: ethers.providers.Web3Provider, value: any) {
    let stringMessage = JSON.stringify(value)
    let signer = await provider.getSigner()
    return await signer.signMessage(stringMessage)
}
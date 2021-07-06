import { ethers } from "ethers";

export async function newProvider():Promise<ethers.providers.Web3Provider> {
    if (!window.ethereum) throw new Error("No wallet connected :'(")
    return new ethers.providers.Web3Provider(window.ethereum)
}


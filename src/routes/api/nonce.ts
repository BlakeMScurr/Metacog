import { randomBytes } from 'crypto';


export async function get() {
    return {
        body: {
            nonce: randomBytes(32).readUInt32BE(),
        }
    }
}
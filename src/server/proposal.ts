import { action, signedAction } from "$lib/eth";

export type channelProposal = makeRoom | joinRoom

export class makeRoom extends action {
    constructor() {
        super("makeRoom")
    }
}
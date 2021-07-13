import {ethers} from 'ethers';
const {AddressZero, HashZero} = ethers.constants;

/* Import statechannels wallet utilities  */
import {Channel, Outcome, State} from '@statechannels/nitro-protocol';

/* Form the participants array */
const participants = [];
for (let i = 0; i < 3; i++) {
  participants[i] = ethers.Wallet.createRandom().address;
}

/* Mock out a chainId: this could be '1' for mainnet or '3' for ropsten */
const chainId = '0x1234';

/* 
    Define the channelNonce 
    :~ how many times have these participants
    already run a channel on this chain?
  */
const channelNonce = 0;

/* 
    Define the challengeDuration (in seconds)
    :~ how long should participants get to respond to challenges?
  */
const challengeDuration = 86400; // 1 day

/* 
    Mock out the appDefinition and appData.
    We will get to these later in the tutorial
  */
const appDefinition = AddressZero;
const appData = HashZero;

/* Construct a Channel object */
const channel: Channel = {chainId, channelNonce, participants};

/* Mock out an outcome */
const outcome: Outcome = [];

/* Putting it all together */
const state: State = {
  turnNum: 0,
  isFinal: false,
  channel,
  challengeDuration,
  outcome,
  appDefinition,
  appData
};
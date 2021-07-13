// from https://docs.statechannels.org/docs/protocol-docs/quick-start

import { GanacheDeployer } from '@statechannels/devtools'
const {
    NitroAdjudicatorArtifact,
    EthAssetHolderArtifact,
    TrivialAppArtifact,
} = require('@statechannels/nitro-protocol').ContractArtifacts;

export async function deploy() {
    const deployer = new GanacheDeployer(Number(process.env.GANACHE_PORT));
    const NITRO_ADJUDICATOR_ADDRESS = await deployer.deploy(NitroAdjudicatorArtifact);
    const ETH_ASSET_HOLDER_ADDRESS = await deployer.deploy(
        EthAssetHolderArtifact,
        {},
        NITRO_ADJUDICATOR_ADDRESS
    );
  
    const TRIVIAL_APP_ADDRESS = await deployer.deploy(TrivialAppArtifact);
  
    return {
        NITRO_ADJUDICATOR_ADDRESS,
        ETH_ASSET_HOLDER_ADDRESS,
        TRIVIAL_APP_ADDRESS,
    };
};

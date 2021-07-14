import { TestContractArtifacts, ContractArtifacts } from '@statechannels/nitro-protocol';
const {
  CountingAppArtifact,
} = TestContractArtifacts
const {
  NitroAdjudicatorArtifact,
  EthAssetHolderArtifact,
} = ContractArtifacts

import { GanacheDeployer } from '@statechannels/devtools';
import { config } from "dotenv"
import findConfig from "find-config"
config({ path: findConfig(".env") })  

// This is the third key generated from a ganache chain seeded with "asdf"
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY

export async function deploy() {
  const deployer = new GanacheDeployer(Number(process.env.GANACHE_PORT), deployerPrivateKey);

  const NITRO_ADJUDICATOR_ADDRESS = await deployer.deploy(NitroAdjudicatorArtifact);

  const ETH_ASSET_HOLDER_ADDRESS = await deployer.deploy(
    EthAssetHolderArtifact,
    {},
    NITRO_ADJUDICATOR_ADDRESS
  );

  const COUNTING_APP_ADDRESS = await deployer.deploy(CountingAppArtifact);

  return {
    "NITRO_ADJUDICATOR_ADDRESS": NITRO_ADJUDICATOR_ADDRESS,
    "ETH_ASSET_HOLDER_ADDRESS": ETH_ASSET_HOLDER_ADDRESS,
    "COUNTING_APP_ADDRESS": COUNTING_APP_ADDRESS,
  };
};

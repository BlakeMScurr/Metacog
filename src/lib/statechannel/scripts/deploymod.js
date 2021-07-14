import { TestContractArtifacts } from '@statechannels/nitro-protocol';
const {
  TestNitroAdjudicatorArtifact,
  TestAssetHolderArtifact,
  CountingAppArtifact,
} = TestContractArtifacts

import { GanacheDeployer } from '@statechannels/devtools';
import { config } from "dotenv"
import findConfig from "find-config"
config({ path: findConfig(".env") })  

// This is the third key generated from a ganache chain seeded with "asdf"
const deployerPrivateKey = "0x4e8d63325c068be064d8ec1f71441ccca5a568f1aba0fd777fbaf9283e041d9d"

export async function deploy() {
  const deployer = new GanacheDeployer(Number(process.env.GANACHE_PORT), deployerPrivateKey);

  const NITRO_ADJUDICATOR_ADDRESS = await deployer.deploy(TestNitroAdjudicatorArtifact);

  const ETH_ASSET_HOLDER_ADDRESS = await deployer.deploy(
    TestAssetHolderArtifact,
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

const {
    TestNitroAdjudicatorArtifact,
    TestAssetHolderArtifact,
    CountingAppArtifact,
  } = require('@statechannels/nitro-protocol').TestContractArtifacts;
  
  const {GanacheDeployer} = require('@statechannels/devtools');
  
  // This is the third key generated from a ganache chain seeded with "asdf"
  const deployerPrivateKey = "0x4e8d63325c068be064d8ec1f71441ccca5a568f1aba0fd777fbaf9283e041d9d"

  const deploy = async () => {
    const deployer = new GanacheDeployer(Number(process.env.GANACHE_PORT), deployerPrivateKey);
  
    const NITRO_ADJUDICATOR_ADDRESS = await deployer.deploy(TestNitroAdjudicatorArtifact);
  
    const ETH_ASSET_HOLDER_ADDRESS = await deployer.deploy(
      TestAssetHolderArtifact,
      {},
      NITRO_ADJUDICATOR_ADDRESS
    );
  
    const TRIVIAL_APP_ADDRESS = await deployer.deploy(CountingAppArtifact);
  
    return {
      NITRO_ADJUDICATOR_ADDRESS,
      ETH_ASSET_HOLDER_ADDRESS,
      TRIVIAL_APP_ADDRESS,
    };
  };
  
  module.exports = {
    deploy,
  };
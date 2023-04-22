import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// コンパイル最適化
const optimizedComilerSettings = {
  version: '0.8.18',
  settings: {
    optimizer: { enabled: true, runs: 1000000 },
    viaIR: true
  }
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{
      version: '0.8.18',
      settings: {
        optimizer: { enabled: true, runs: 1000000 }
      }
    }],
    overrides: {
      'contracts/core/EntryPoint.sol': optimizedComilerSettings,
      'contracts/samples/SimpleAccount.sol': optimizedComilerSettings
    }
  },
};

export default config;

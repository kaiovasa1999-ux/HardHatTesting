import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    // Goerli Testnet
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.PRIVATE_KEY}`,
      chainId: 5,
      accounts: [
        `0x${process.env.PRIVATE_KEY}`,
      ],
    },
  },
};


module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;

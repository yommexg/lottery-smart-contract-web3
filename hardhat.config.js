require("@nomiclabs/hardhat-waffle");
// require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const ARBITRUM_SEPOLIA_RPC_URL = process.env.ARBITRUM_SEPOLIA_RPC_URL

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },

    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmation: 6,
    },

    arbitrumSepolia:{
      url:  ARBITRUM_SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 421614,
      blockConfirmation: 5,
    }
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "ETH",
  },
  solidity: "0.8.27",
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
   etherscan: {
  apiKey: ETHERSCAN_API_KEY,
  customChains: [
    {
      network: "arbitrumSepolia",
      chainId: 421614,
      urls: {
        apiURL: "https://sepolia-rollup.arbitrum.io/rpc",  
        browserURL: `https://sepolia.arbiscan.io/`, 
      },
    },
  ],
},

  mocha: {
    timeout: 500000,
  },
};

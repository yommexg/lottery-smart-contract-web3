const { ethers } = require("hardhat");

const networkConfig = {
  11155111: {
    name: "sepolia",
    vrfCoordinatorV2: "0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B",
    entranceFee: ethers.utils.parseEther("0.01"),
    gasLane:
      "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae",
    subscriptionId:
      "7516541551574787105059600431039984118820251292904740563346640402326568923257",
    callbackGasLimit: "500000",
    interval: 30,
  },

  421614: {
    name: "arbitrumSepolia",
    vrfCoordinatorV2: "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E",
    entranceFee: ethers.utils.parseEther("0.01"),
    gasLane:
      "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae",
    subscriptionId:
      "51968135519300855685037069103954343410572581087530810738887994229881903857697",
    callbackGasLimit: "500000",
    interval: 30,
  },

  31337: {
    name: "hardhat",
    entranceFee: ethers.utils.parseEther("0.01"),
    gasLane:
      "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae",
    callbackGasLimit: "500000",
    interval: 30,
    subscriptionId: 1,
  },
};

const developmentChain = ["hardhat", "localhost"];

module.exports = {
  networkConfig,
  developmentChain,
};

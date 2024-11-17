const { network, getNamedAccounts, ethers } = require("hardhat");
const { assert, expect } = require("chai");

const { developmentChain } = require("../../helper-hardhat-config");

developmentChain.includes(network.name)
  ? describe.skip
  : describe("Raffle Staging Test", () => {
      let raffle, raffleEntranceFee, deployer;

      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        raffle = await ethers.getContract("Raffle", deployer);
        raffleEntranceFee = await raffle.getEntranceFee();
      });

      describe("fufilRandomWords", () => {
        it("works with live Chainlink Keepers and ChainlinkVRF, we get a random winner", async () => {
          // Enter the raffle
          console.log("Setting up test...");
          const startingTimeStamp = await raffle.getLatestTimeStamp();
          const accounts = await ethers.getSigners();

          console.log("Setting up Listener...");
          await new Promise(async (resolve, reject) => {
            raffle.once("WinnerPicked", async () => {
              console.log("Winner Picked Event Fired");

              try {
                const recentWinner = await raffle.getRecentWinner();
                const raffleState = await raffle.getRaffleState();
                const endingTimeStamp = await raffle.getLatestTimeStamp();
                const winnerEndingBalance = await accounts[0].getBalance();

                await expect(raffle.getPlayer(0)).to.be.reverted;
                assert.equal(recentWinner.toString(), accounts[0].address);
                assert.equal(raffleState, 0);
                assert.equal(
                  winnerEndingBalance.toString(),
                  winnerStartingBalance.add(raffleEntranceFee).toString()
                );
                assert(endingTimeStamp > startingTimeStamp);
                resolve();
              } catch (error) {
                console.log(error);
                reject(error);
              }
            });

            console.log("Entering Raffle...");
            const tx = await raffle.enterRaffle({ value: raffleEntranceFee });

            await tx.wait(1);

            console.log("Ok, time to wait...");
            const winnerStartingBalance = await accounts[0].getBalance();
          });
        });
      });
    });

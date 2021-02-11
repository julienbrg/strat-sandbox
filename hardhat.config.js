require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 const INFURA_PROJECT_ID = "39546745a23f44edb9248c4dcdb0c6f3";
 const GOERLI_PRIVATE_KEY = "35d0cf5fb603fe1270632e07126813421a4c5724d5656681ed92d7e5958d79bd";

 module.exports = {
   solidity: "0.8.0",
   networks: {
     goerli: {
       url: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
       accounts: [`0x${GOERLI_PRIVATE_KEY}`]
     }
   }
 };

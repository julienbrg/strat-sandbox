async function main() {

  if (network.name === "hardhat") {
    console.log("network: ", network.name);
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // Deploy Greeter.sol
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello!");
  await greeter.deployed();
  console.log("Greeter.sol is deployed at", greeter.address);

  saveFrontendFiles(greeter);
}

function saveFrontendFiles(greeter) {


}

function saveFrontendFiles(greeter) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ Greeter: greeter.address }, undefined, 2)
  );

  const GreeterArtifact = artifacts.readArtifactSync("Greeter");
  fs.writeFileSync(
    contractsDir + "/Greeter.json",
    JSON.stringify(GreeterArtifact, null, 2)
  );

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

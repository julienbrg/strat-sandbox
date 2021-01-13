# Strat Sandbox

## Install

```
git clone https://github.com/julienbrg/strat-sandbox.git
cd strat-sandbox
npm install
```

## Test

```
npx hardhat test
```

## Deploy to localhost

```
npx hardhat node
```

In a new window:
```
npx hardhat run scripts/deployer.js --network localhost
```

## Run

```
cd frontend
npm install
npm start
```

## Deploy to goerli

Switch network in the `Dapp.js` file (lines 11 and 12):
```
const HARDHAT_NETWORK_ID = '5';
// const HARDHAT_NETWORK_ID = '31337';
```

In your terminal:
```
npx hardhat run scripts/deployer.js --network goerli
```

## License

GPL-3.0

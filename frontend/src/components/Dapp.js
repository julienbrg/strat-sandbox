import React from "react";
import { ethers } from "ethers";
//import { BigNumber } from "@ethersproject/bignumber";
//import { ContractFactory } from 'ethers';
import contractAddress from "../contracts/contract-address.json";
import { NoWalletDetected } from "./NoWalletDetected";
import { ConnectWallet } from "./ConnectWallet";
import { Loading } from "./Loading";
import GreeterArtifact from "../contracts/Greeter.json";

// const HARDHAT_NETWORK_ID = '5';
const HARDHAT_NETWORK_ID = '31337';

//const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

export class Dapp extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {

      selectedAddress: undefined,
      txBeingSent: undefined,
      transactionError: undefined,
      networkError: undefined,
      greeting: undefined

    };

    this.state = this.initialState;
  }

  render() {
    if (window.ethereum === undefined) {
      return <NoWalletDetected />;
    }

    if (!this.state.selectedAddress) {
      return (
        <ConnectWallet
          connectWallet={() => this._connectWallet()}
          networkError={this.state.networkError}
          dismiss={() => this._dismissNetworkError()}
        />
      );
    }

    if (!this.state.selectedAddress) {
    return <Loading />;
    }

    return (

      <div className="container p-4">
        <div className="row">
          <div className="col-12">
            <h1>
              Strat Sandbox v0.1.0
            </h1>
            <br />
            <p>
              Welcome! Your wallet address is <b>{this.state.selectedAddress}</b>
            </p>

            <p>
              The Greeter contract is saying: "<b>{this.state.greeting}</b>"
            </p>

          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-12">

            <p><a target="_blank" rel="noreferrer" className="text-success" href="https://github.com/julienbrg/strat-sandbox">Strat Sandbox on Github</a></p>
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    this._stopPollingData();
  }

  async _connectWallet() {
    const [selectedAddress] = await window.ethereum.enable();
    if (!this._checkNetwork()) {
      return;
    }

    this._initialize(selectedAddress);

    window.ethereum.on("accountsChanged", ([newAddress]) => {
      this._stopPollingData();
      if (newAddress === undefined) {
        return this._resetState();
      }

      this._initialize(newAddress);
    });

    window.ethereum.on("chainChanged", ([networkId]) => {
      this._stopPollingData();
      this._resetState();
    });
  }

  _initialize(userAddress) {

    this.setState({ selectedAddress: userAddress});
    this._intializeEthers();
    this._startPollingData();
  }

  async _intializeEthers() {

    this._provider = new ethers.providers.Web3Provider(window.ethereum);

    this._greeter = new ethers.Contract(

      contractAddress.Greeter,
      GreeterArtifact.abi,
      this._provider.getSigner(0)

    );
    console.log(contractAddress);
  }

  _startPollingData() {
    this._pollDataInterval = setInterval(() => this._updateState(), 1000);
  }

  _stopPollingData() {
    clearInterval(this._pollDataInterval);
    this._pollDataInterval = undefined;
  }

  async _updateState() {

    this._greeter = new ethers.Contract(
      contractAddress.Greeter,
      GreeterArtifact.abi,
      this._provider.getSigner(0)
    );

    const greeting = await this._greeter.greet();
    this.setState({ greeting });
  }

  _dismissTransactionError() {
    this.setState({ transactionError: undefined });
  }

  _dismissNetworkError() {
    this.setState({ networkError: undefined });
  }

  _getRpcErrorMessage(error) {
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  }

  _resetState() {
    this.setState(this.initialState);
  }

  _checkNetwork() {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }

    this.setState({
      networkError: 'Please switch network in your Metamask (it can be "Localhost 8545" or "Goerli Network")'
    });

    return false;
  }
}

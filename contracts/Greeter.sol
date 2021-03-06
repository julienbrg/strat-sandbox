// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity 0.8.0;

// import "hardhat/console.sol";

// to be replaced
contract Greeter {
  string greeting;

  constructor(string memory _greeting) {
    greeting = _greeting;
  }

  function greet() public view returns (string memory) {
    return greeting;
  }

  function setGreeting(string memory _greeting) public {
    greeting = _greeting;
  }
}

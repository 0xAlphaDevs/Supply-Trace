// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyTraceRegistry {
    // Struct to store user information
    struct User {
        string name;
        string industry;
    }

    // Mapping to store user information against wallet addresses
    mapping(address => User) public users;

    // Event to emit when a new user is added
    event UserAdded(address indexed wallet, string name, string industry);

    // Function to add or update user information
    function setUser(string memory _name, string memory _industry) public {
        users[msg.sender] = User(_name, _industry);
        emit UserAdded(msg.sender, _name, _industry);
    }

    // Function to get user information
    function getUser(address _wallet) public view returns (string memory, string memory) {
        User memory user = users[_wallet];
        return (user.name, user.industry);
    }
}

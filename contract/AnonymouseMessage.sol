// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageStorage {
    struct Message {
        string content;
        address sender;
    }

    mapping(uint256 => Message) private messages;

    uint256 private idCounter;

    event MessageStored(uint256 id, address indexed sender, string message);

    function storeMessage(string memory message) public returns (uint256) {
        require(bytes(message).length > 0, "Message cannot be empty");
        idCounter++;
        messages[idCounter] = Message({
            content: message,
            sender: msg.sender
        });
        emit MessageStored(idCounter, msg.sender, message);
        return idCounter;
    }

    function getMessage(uint256 id) public view returns (string memory, address) {
        require(id > 0 && id <= idCounter, "Invalid message ID");
        Message memory message = messages[id];
        return (message.content, message.sender);
    }
}
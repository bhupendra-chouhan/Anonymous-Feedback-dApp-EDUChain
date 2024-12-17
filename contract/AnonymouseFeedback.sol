// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FeedbackStorage {
    struct Feedback {
        string content;
        address sender;
    }

    mapping(uint256 => Feedback) private feedbacks;

    uint256 private idCounter;

    event FeedbackCreated(uint256 id, address indexed sender, string feedback);

    function createFeedback(string memory feedback) public returns (uint256) {
        require(bytes(feedback).length > 0, "Feedback cannot be empty");
        idCounter++;
        feedbacks[idCounter] = Feedback({
            content: feedback,
            sender: msg.sender
        });
        emit FeedbackCreated(idCounter, msg.sender, feedback);
        return idCounter;
    }

    function getFeedback(uint256 id) public view returns (string memory, address) {
        require(id > 0 && id <= idCounter, "Invalid feedback ID");
        Feedback memory feedback = feedbacks[id];
        return (feedback.content, feedback.sender);
    }
}
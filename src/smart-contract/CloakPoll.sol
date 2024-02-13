// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract CloakPoll {
    struct Poll {
        uint id;
        string title;
        string description;
        uint startTime;
        uint endTime;
        uint voteCountAgree;
        uint voteCountDisagree;
        bool executed;
    }

    address public admin;
    Poll[] public polls;
    mapping(uint => mapping(address => bool)) public hasVoted;

    event PollCreated(uint id, string title, string description, uint startTime, uint endTime);
    event Voted(uint pollId, bool agree, address voter);
    event PollExecuted(uint id, bool result);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function createPoll(string memory title, string memory description, uint startTime, uint endTime) external onlyAdmin {
        require(startTime < endTime, "Start time must be before end time");
        require(startTime > block.timestamp, "Start time must be in the future");

        polls.push(Poll({
            id: polls.length,
            title: title,
            description: description,
            startTime: startTime,
            endTime: endTime,
            voteCountAgree: 0,
            voteCountDisagree: 0,
            executed: false
        }));
        emit PollCreated(polls.length - 1, title, description, startTime, endTime);
    }

    function vote(uint pollId, bool agree) external {
        require(pollId < polls.length, "Poll does not exist");
        require(!hasVoted[pollId][msg.sender], "Already voted on this poll");
        require(block.timestamp >= polls[pollId].startTime, "Voting has not started yet");
        require(block.timestamp <= polls[pollId].endTime, "Voting has ended");

        Poll storage poll = polls[pollId];
        hasVoted[pollId][msg.sender] = true;

        if (agree) {
            poll.voteCountAgree++;
        } else {
            poll.voteCountDisagree++;
        }

        emit Voted(pollId, agree, msg.sender);
    }

   function executePoll(uint pollId) external onlyAdmin {
        require(pollId < polls.length, "Poll does not exist");
        require(block.timestamp > polls[pollId].endTime, "Voting period has not ended");
        require(!polls[pollId].executed, "Poll already executed");

        Poll storage poll = polls[pollId];
        poll.executed = true;

        bool result = poll.voteCountAgree > poll.voteCountDisagree;

        emit PollExecuted(pollId, result);
    }
}
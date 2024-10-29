// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract HackVentures {
    struct Hackathon {
        address organizer;
        string name;
        string description;
        uint256 entryFee;
        uint256 registrationDeadline;
        uint256 approvalDeadline;
        uint256 submissionDeadline;
        uint256 prizeDeadline;
        uint256 totalPrizePool;
        bool active;
        mapping(address => Participant) participants;
        address[] participantList;
        mapping(address => bool) hasSubmitted;
        bool prizesDistributed;
    }

    struct Participant {
        bool approved;
        bool paid;
        bool refunded;
        string githubAccount;
        string projectIdea;
        string pastAchievements;
        address teamLeader;
    }

    mapping(uint256 => Hackathon) public hackathons;
    uint256 public hackathonCounter;

    event HackathonCreated(
        uint256 indexed hackathonId,
        address organizer,
        string name,
        uint256 entryFee
    );
    event ParticipantRegistered(uint256 indexed hackathonId, address participant);
    event ParticipantApproved(uint256 indexed hackathonId, address participant);
    event ParticipantDeclined(uint256 indexed hackathonId, address participant, uint256 amount);
    event ProjectSubmitted(uint256 indexed hackathonId, address participant);
    event PrizeDistributed(uint256 indexed hackathonId, address winner, uint256 amount);
    event RefundIssued(uint256 indexed hackathonId, address participant, uint256 amount);

    function createHackathon(
        string memory _name,
        string memory _description,
        uint256 _entryFee,
        uint256 _registrationDuration,
        uint256 _approvalDuration,
        uint256 _submissionDuration,
        uint256 _prizeDistributionDuration
    ) external {
        require(_entryFee > 0, "Entry fee must be greater than 0");
        require(_registrationDuration > 0, "Registration duration must be greater than 0");
        require(_approvalDuration > 0, "Approval duration must be greater than 0");
        require(_submissionDuration > 0, "Submission duration must be greater than 0");
        require(_prizeDistributionDuration > 0, "Prize distribution duration must be greater than 0");

        uint256 hackathonId = hackathonCounter++;
        Hackathon storage newHackathon = hackathons[hackathonId];

        newHackathon.organizer = msg.sender;
        newHackathon.name = _name;
        newHackathon.description = _description;
        newHackathon.entryFee = _entryFee;
        newHackathon.registrationDeadline = block.timestamp + _registrationDuration;
        newHackathon.approvalDeadline = newHackathon.registrationDeadline + _approvalDuration;
        newHackathon.submissionDeadline = newHackathon.approvalDeadline + _submissionDuration;
        newHackathon.prizeDeadline = newHackathon.submissionDeadline + _prizeDistributionDuration;
        newHackathon.active = true;

        emit HackathonCreated(hackathonId, msg.sender, _name, _entryFee);
    }

    function registerForHackathon(
        uint256 _hackathonId,
        string memory _githubAccount,
        string memory _projectIdea,
        string memory _pastAchievements,
        address[] memory _teamMembers
    ) external payable {
        Hackathon storage hackathon = hackathons[_hackathonId];
        require(hackathon.active, "Hackathon is not active");
        require(block.timestamp < hackathon.registrationDeadline, "Registration period has ended");
        require(msg.value == hackathon.entryFee, "Incorrect entry fee");

        hackathon.participants[msg.sender] = Participant({
            approved: false,
            paid: true,
            refunded: false,
            githubAccount: _githubAccount,
            projectIdea: _projectIdea,
            pastAchievements: _pastAchievements,
            teamLeader: msg.sender
        });

        for (uint i = 0; i < _teamMembers.length; i++) {
            require(_teamMembers[i] != msg.sender, "Team leader cannot be in member list");
            hackathon.participants[_teamMembers[i]] = Participant({
                approved: false,
                paid: false,
                refunded: false,
                githubAccount: "",
                projectIdea: "",
                pastAchievements: "",
                teamLeader: msg.sender
            });
        }

        hackathon.participantList.push(msg.sender);
        hackathon.totalPrizePool += msg.value;

        emit ParticipantRegistered(_hackathonId, msg.sender);
    }

    function approveParticipant(uint256 _hackathonId, address _participant) external {
        Hackathon storage hackathon = hackathons[_hackathonId];
        require(msg.sender == hackathon.organizer, "Only organizer can approve");
        require(block.timestamp <= hackathon.approvalDeadline, "Approval period ended");
        require(hackathon.participants[_participant].paid, "Participant hasn't paid");

        hackathon.participants[_participant].approved = true;
        emit ParticipantApproved(_hackathonId, _participant);
    }

    function declineParticipant(uint256 _hackathonId, address _participant) external {
        Hackathon storage hackathon = hackathons[_hackathonId];
        require(msg.sender == hackathon.organizer, "Only organizer can decline");
        require(!hackathon.participants[_participant].approved, "Participant already approved");
        require(hackathon.participants[_participant].paid, "Participant hasn't paid");
        require(!hackathon.participants[_participant].refunded, "Already refunded");

        hackathon.participants[_participant].refunded = true;
        payable(_participant).transfer(hackathon.entryFee);

        emit ParticipantDeclined(_hackathonId, _participant, hackathon.entryFee);
    }

    function submitProject(uint256 _hackathonId) external {
        Hackathon storage hackathon = hackathons[_hackathonId];
        require(hackathon.participants[msg.sender].approved, "Not approved");
        require(block.timestamp <= hackathon.submissionDeadline, "Submission period ended");

        hackathon.hasSubmitted[msg.sender] = true;
        emit ProjectSubmitted(_hackathonId, msg.sender);
    }

    function distributePrizes(
        uint256 _hackathonId,
        address[] memory _winners,
        uint256[] memory _amounts
    ) external {
        Hackathon storage hackathon = hackathons[_hackathonId];
        require(msg.sender == hackathon.organizer, "Only organizer can distribute");
        require(block.timestamp <= hackathon.prizeDeadline, "Prize distribution period ended");
        require(_winners.length == _amounts.length, "Arrays length mismatch");

        uint256 totalAmount = 0;
        for (uint i = 0; i < _amounts.length; i++) {
            totalAmount += _amounts[i];
        }
        require(totalAmount <= hackathon.totalPrizePool, "Insufficient prize pool");

        for (uint i = 0; i < _winners.length; i++) {
            require(hackathon.hasSubmitted[_winners[i]], "Winner didn't submit");
            payable(_winners[i]).transfer(_amounts[i]);
            emit PrizeDistributed(_hackathonId, _winners[i], _amounts[i]);
        }

        hackathon.prizesDistributed = true;
    }

    function refundParticipants(uint256 _hackathonId) external {
        Hackathon storage hackathon = hackathons[_hackathonId];
        require(block.timestamp > hackathon.prizeDeadline && !hackathon.prizesDistributed, "Refund conditions not met");

        for (uint i = 0; i < hackathon.participantList.length; i++) {
            address participant = hackathon.participantList[i];
            if (hackathon.participants[participant].approved &&
                hackathon.hasSubmitted[participant] &&
                hackathon.participants[participant].paid) {
                payable(participant).transfer(hackathon.entryFee);
                emit RefundIssued(_hackathonId, participant, hackathon.entryFee);
            }
        }

        hackathon.active = false;
    }
}

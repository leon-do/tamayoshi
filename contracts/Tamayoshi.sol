// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Tamayoshi {
    //  VARIABLES
    mapping(address => Character) private characters;

    struct Character {
        uint dob;       // Date of Birth/Block
        uint dod;       // Date of Death X_X

        uint payRate;   // increase amount per block
        uint payLast;   // last pay block time

        uint nap;       // current sleepy amount
        uint napRate;   // decay amount per block
        uint napLast;   // last nap block time

        uint eat;       // current hunger amount
        uint eatRate;   // decay amount per block
        uint eatLast;   // last eat block time

        uint run;       // current energy amount
        uint runRate;   // decay amount per block
        uint runLast;   // last run block time
    }

    // EVENTS
    event Action(string _action, address _address, uint _amount);

    //  WRITE FUNCTIONS
    function start() public {
        require(isDead(msg.sender), "O_O");
        Character storage character = characters[msg.sender];

        character.dob = block.timestamp;
        character.dod = 0;

        character.payRate = random("pay", 25, 50);
        character.payLast = block.timestamp;

        character.nap = 3600;
        character.napRate = random("nap", 1, 5);
        character.napLast = block.timestamp;

        character.eat = 3600;
        character.eatRate = random("eat", 1, 5);
        character.eatLast = block.timestamp;

        character.run = 3600;
        character.runRate = random("run", 1, 5);
        character.runLast = block.timestamp;
        emit Action("start", msg.sender, 0);
    }

    function nap() public {
        require(!isDead(msg.sender), "X_X");
        Character storage character = characters[msg.sender];
        uint amount = getPay(msg.sender);
        character.nap = character.nap + amount;
        character.payLast = block.timestamp;
        emit Action("nap", msg.sender, amount);
    }

    function eat() public {
        require(!isDead(msg.sender), "X_X");
        Character storage character = characters[msg.sender];
        uint amount = getPay(msg.sender);
        character.eat = character.eat + amount;
        character.payLast = block.timestamp;
        emit Action("eat", msg.sender, amount);
    }

    function run() public {
        require(!isDead(msg.sender), "X_X");
        Character storage character = characters[msg.sender];
        uint amount = getPay(msg.sender);
        character.run = character.run + amount;
        character.payLast = block.timestamp;
        emit Action("run", msg.sender, amount);
    }

    //  READ FUNCTIONS
    function getCharacter(address _address) public view returns(Character memory) {
        return characters[_address];
    }

    // get current amount = total + (rate * (now - last))
    function getPay(address _address) public view returns(uint) {
        Character storage character = characters[_address];
        return (character.payRate * (block.timestamp - character.payLast));
    }

    // get current amount = total - (rate * (now - last))
    function getNap(address _address) public view returns(uint) {
        Character storage character = characters[_address];
        uint decay = character.napRate * (block.timestamp - character.napLast);
        if (character.nap > decay) {
            return character.nap - decay;
        } else {
            return 0;
        }
    }

    // get current amount = total - (rate * (now - last))
    function getEat(address _address) public view returns(uint) {
        Character storage character = characters[_address];
        uint decay = character.eatRate * (block.timestamp - character.eatLast);
        if (character.eat > decay) {
            return character.eat - decay;
        } else {
            return 0;
        }
    }

    // get current amount = total - (rate * (now - last))
    function getRun(address _address) public view returns(uint) {
        Character storage character = characters[_address];
        uint decay = character.runRate * (block.timestamp - character.runLast);
        if (character.run > decay) {
            return character.run - decay;
        } else {
            return 0;
        }
    }

    function isDead(address _address) public view returns(bool) {
        return getNap(_address) == 0 || getEat(_address) == 0 || getRun(_address) == 0;
    }

    // HELPERS
    function random(string memory _entropy, uint _min, uint _max) internal view returns (uint256) {
        require(_max > _min, "max > min");
        uint256 randomValue = uint256(keccak256(abi.encodePacked(
            tx.origin,
            blockhash(block.number - 1),
            block.timestamp,
            _entropy
        )));
        return (randomValue % (_max - _min + 1)) + _min;
    }
}
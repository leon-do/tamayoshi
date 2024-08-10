// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { IEntropyConsumer } from "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import { IEntropy } from "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";

contract TamayoshiPyth is IEntropyConsumer {
    //  VARIABLES
    address private provider = 0x41c9e39574F40Ad34c79f1C99B66A45eFB830d4c;
    IEntropy private entropy = IEntropy(provider);
    mapping(address => Character) private characters;
    mapping(uint64 => address) private randomness;

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

        character.payLast = block.timestamp;

        character.nap = 3600;
        character.napLast = block.timestamp;

        character.eat = 3600;
        character.eatLast = block.timestamp;

        character.run = 3600;
        character.runLast = block.timestamp;

        uint fee = entropy.getFee(provider);
        bytes32 clientEntropy = 0x5d5e6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d;
        uint64 sequenceNumber = entropy.requestWithCallback{value: fee}(provider, clientEntropy);
        randomness[sequenceNumber] = msg.sender;
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
    function random(string memory _entropy, bytes32 _randomNumber, uint _min, uint _max) internal view returns (uint256) {
        require(_max > _min, "max > min");
        uint256 randomValue = uint256(keccak256(abi.encodePacked(
            tx.origin,
            blockhash(block.number - 1),
            block.timestamp,
            _entropy,
            _randomNumber
        )));
        return (randomValue % (_max - _min + 1)) + _min;
    }

    // This method is required by the IEntropyConsumer interface.
    // It returns the address of the entropy contract which will call the callback.
    function getEntropy() internal view override returns (address) {
        return address(entropy);
    }
    
    // It is called by the entropy contract when a random number is generated.
    function entropyCallback(
        uint64 sequenceNumber,
        // If your app uses multiple providers, you can use this argument to
        // distinguish which one is calling the app back.
        address provider,
        bytes32 randomNumber
    ) internal override {
        Character storage character = characters[randomness[sequenceNumber]];
        character.payRate = random("pay", randomNumber, 25, 50);
        character.napRate = random("nap", randomNumber, 1, 5);
        character.eatRate = random("eat", randomNumber, 1, 5);
        character.runRate = random("run", randomNumber, 1, 5);
        emit Action("start", msg.sender, 0);
    }
}
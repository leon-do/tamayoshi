import { createThirdwebClient } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { getContract } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const chain = baseSepolia;

export const goldskyUrl =
  "https://api.goldsky.com/api/public/project_clvtxueu97rs401x05mh991np/subgraphs/tamayoshi-base-sep/1.0.0/gn";

export const blockscoutUrl = "https://base-sepolia.blockscout.com";

// https://portal.thirdweb.com/references/typescript/v5/prepareContractCall
// prettier-ignore
export const contract = getContract({
  client,
  address: "0x3e7645f16fe724fc8151f696ac67f694266a11d2",
  chain,
  abi: [ { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "_action", "type": "string" }, { "indexed": false, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "Action", "type": "event" }, { "inputs": [], "name": "eat", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_address", "type": "address" } ], "name": "getCharacter", "outputs": [ { "components": [ { "internalType": "uint256", "name": "dob", "type": "uint256" }, { "internalType": "uint256", "name": "dod", "type": "uint256" }, { "internalType": "uint256", "name": "payRate", "type": "uint256" }, { "internalType": "uint256", "name": "payLast", "type": "uint256" }, { "internalType": "uint256", "name": "nap", "type": "uint256" }, { "internalType": "uint256", "name": "napRate", "type": "uint256" }, { "internalType": "uint256", "name": "napLast", "type": "uint256" }, { "internalType": "uint256", "name": "eat", "type": "uint256" }, { "internalType": "uint256", "name": "eatRate", "type": "uint256" }, { "internalType": "uint256", "name": "eatLast", "type": "uint256" }, { "internalType": "uint256", "name": "run", "type": "uint256" }, { "internalType": "uint256", "name": "runRate", "type": "uint256" }, { "internalType": "uint256", "name": "runLast", "type": "uint256" } ], "internalType": "struct Tamayoshi.Character", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_address", "type": "address" } ], "name": "getEat", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_address", "type": "address" } ], "name": "getNap", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_address", "type": "address" } ], "name": "getPay", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_address", "type": "address" } ], "name": "getRun", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_address", "type": "address" } ], "name": "isDead", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nap", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "run", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "start", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ] 
});

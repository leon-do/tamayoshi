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

// https://portal.thirdweb.com/references/typescript/v5/prepareContractCall
export const contract = getContract({
  client,
  address: "0x3a8A85A6122C92581f590444449Ca9e66D8e8F35",
  chain,
  abi: [
    {
      inputs: [],
      name: "increment",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "player",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "number",
          type: "uint256",
        },
      ],
      name: "Incremented",
      type: "event",
    },
    {
      inputs: [],
      name: "number",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ],
});

export const goldskyUrl = "https://api.goldsky.com/api/public/project_clvtxueu97rs401x05mh991np/subgraphs/increment-base-sepolia/1.0.0/gn"

export const goldskyQuery = "query Query { incrementeds(orderBy: timestamp_, orderDirection: desc) { number player timestamp_ transactionHash_ } }"

export const etherscanUrl = "https://sepolia.basescan.org"
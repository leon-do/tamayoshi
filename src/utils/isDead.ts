import { readContract } from "thirdweb";
import { contract } from "../app/client";

export default async function isDead(address: string): Promise<boolean> {
  return readContract({
    contract,
    method: "isDead",
    params: [address],
  });
}

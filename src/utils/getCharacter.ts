import { readContract } from "thirdweb";
import { contract } from "../app/client";

export default async function getCharacter(
  address: string
): Promise<Character> {
  const character = await readContract({
    contract,
    method: "getCharacter",
    params: [address],
  });
  return character;
}

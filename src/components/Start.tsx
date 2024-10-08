import "react-awesome-button/dist/styles.css";
import { useEffect, useState } from "react";
import { TransactionButton } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contract } from "../app/client";
import getCharacter from "@/utils/getCharacter";
import formatAmount from "@/utils/formatAmount";

interface Props {
  dead: boolean;
  disabled: boolean;
  address: string | undefined;
  tailwindStyles?: string;
}

export default function Start(props: Props) {
  const [character, setCharacter] = useState<Character>();
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    if (props.dead) return;
    updateCharacter();
  }, [props]);

  // amount = rate * (now - last)
  useEffect(() => {
    if (props.dead) return;
    const interval = setInterval(() => {
      if (!character) return;
      const rate = character.payRate;
      const now = BigInt(Math.floor(Date.now() / 1000));
      const last = character.payLast;
      const amt = rate * (now - last);
      setAmount(amt.toString());
    }, 100);
    return () => clearInterval(interval);
  }, [character]);

  // update payLast
  useEffect(() => {
    if (props.dead) return;
    const interval = setInterval(() => {
      updateCharacter();
    }, 1000);
    return () => clearInterval(interval);
  }, [props]);

  const updateCharacter = async () => {
    if (!props.address) return;
    const character = await getCharacter(props.address);
    setCharacter(character);
  };

  return (
    <>
      {/* https://portal.thirdweb.com/typescript/v5/transactions/prepare */}
      <TransactionButton
        unstyled
        className={`${
          props.disabled ? "bg-gray-400" : props.tailwindStyles
        } flex flex-col items-center justify-center
          text-5xl text-white rounded-3xl cursor-pointer min-h-[180px]
          [box-shadow:0_15px_0_0_#edf2f4,0_25px_0_0_#1b70f841]
          duration-150
          active:translate-y-2
          active:[box-shadow:0_0px_0_0_#edf2f4,0_0px_0_0_#1b70f841]`}
        transaction={() => {
          const tx = prepareContractCall({
            contract,
            method: "start",
            params: [],
          });
          return tx;
        }}
        onTransactionSent={(result) => {
          console.log("Transaction submitted", result.transactionHash);
        }}
        onTransactionConfirmed={(receipt) => {
          console.log("Transaction confirmed", receipt.transactionHash);
          window.location.reload();
        }}
        onError={(error) => {
          console.error("Transaction error", error);
        }}
      >
        {!props.dead && !props.disabled ? formatAmount(amount) : ""}
      </TransactionButton>
    </>
  );
}

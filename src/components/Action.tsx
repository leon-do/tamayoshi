import "react-awesome-button/dist/styles.css";
import { useEffect, useState } from "react";
import { TransactionButton } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contract } from "../app/client";
import getCharacter from "@/utils/getCharacter";
import formatTime from "@/utils/formatTime";

interface Props {
  disabled: boolean;
  method: "eat" | "nap" | "run";
  address: string | undefined;
  tailwindStyles?: string;
}

export default function Action(props: Props) {
  const [character, setCharacter] = useState<Character>();
  const [time, setTime] = useState<string>("00D 00H 00M 00S");

  useEffect(() => {
    updateCharacter();
  }, [props]);

  useEffect(() => {
    const interval = setInterval(() => {
      // amount = total - (rate * (now - last))
      if (!character) return;
      const total = character[`${props.method}` as keyof Character];
      const rate = character[`${props.method}Rate` as keyof Character];
      const now = BigInt(Math.floor(Date.now() / 1000));
      const last = character[`${props.method}Last` as keyof Character];
      const amount = total - rate * (now - last);
      setTime(formatTime(amount));
    }, 1000);
    return () => clearInterval(interval);
  }, [props, character]);

  const updateCharacter = async () => {
    if (!props.address) return;
    const character = await getCharacter(props.address);
    setCharacter(character);
  };

  return (
    <>
      {/* https://portal.thirdweb.com/typescript/v5/transactions/prepare */}
      <TransactionButton
        disabled={props.disabled}
        unstyled
        className={`${
          props.disabled ? "bg-gray-400" : props.tailwindStyles
        } flex flex-col items-center justify-center
          text-5xl text-white rounded-3xl cursor-pointer
          [box-shadow:0_15px_0_0_#edf2f4,0_25px_0_0_#1b70f841]
          duration-150
          active:translate-y-2
          active:[box-shadow:0_0px_0_0_#edf2f4,0_0px_0_0_#1b70f841]`}
        transaction={() => {
          const tx = prepareContractCall({
            contract,
            method: props.method,
            params: [],
          });
          return tx;
        }}
        onTransactionSent={(result) => {
          console.log("Transaction submitted", result.transactionHash);
        }}
        onTransactionConfirmed={(receipt) => {
          console.log("Transaction confirmed", receipt.transactionHash);
          updateCharacter();
        }}
        onError={(error) => {
          console.error("Transaction error", error);
        }}
      >
        {!character ? "000 000 000 000" : time}
      </TransactionButton>
    </>
  );
}

import "react-awesome-button/dist/styles.css";
import { TransactionButton } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contract } from "../app/client";

export default function Button() {
  return (
    <>
      {/* https://portal.thirdweb.com/typescript/v5/transactions/prepare */}
      <TransactionButton
        unstyled
        className="flex flex-col items-center justify-center
          text-8xl text-white w-60 h-60 bg-red-400 rounded-3xl cursor-pointer
          [box-shadow:0_15px_0_0_#eb2626,0_25px_0_0_#1b70f841]
          duration-150
          active:translate-y-2
          active:[box-shadow:0_0px_0_0_#eb2626,0_0px_0_0_#1b70f841]"
        transaction={() => {
          const tx = prepareContractCall({
            contract,
            method: "increment",
            params: [],
          });
          return tx;
        }}
        onTransactionSent={(result) => {
          console.log("Transaction submitted", result.transactionHash);
        }}
        onTransactionConfirmed={(receipt) => {
          console.log("Transaction confirmed", receipt.transactionHash);
        }}
        onError={(error) => {
          console.error("Transaction error", error);
        }}
      >
        +
      </TransactionButton>
    </>
  );
}

import { useState, useEffect } from "react";
import fetchTransactions from "@/utils/fetchTransactions";
import { etherscanUrl } from "@/app/client";
import formatAmount from "@/utils/formatAmount";

interface Props {
  disabled: boolean;
  address: string | undefined;
  tailwindStyles: string;
}

export default function History(props: Props) {
  const [transaction, setTransaction] = useState<Action[]>();
  const query = `query MyQuery { actions( orderBy: timestamp_ orderDirection: desc first: 1 where: {address: "${props.address?.toLowerCase()}"} ) { action address amount block_number id timestamp_ transactionHash_ contractId_ } }`;

  useEffect(() => {
    // Fetch immediately on mount
    fetchTransactions(query).then((tx) => {
      setTransaction(tx);
    });
    // then Fetch every seconds
    const interval = setInterval(() => {
      fetchTransactions(query).then((tx) => {
        setTransaction(tx);
      });
    }, 5000);
    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [query]);

  return (
    <div
      className={`${
        props.disabled ? "bg-gray-400" : props.tailwindStyles
      } break-all flex flex-col items-center justify-center
        text-5xl text-white rounded-3xl cursor-pointer
        [box-shadow:0_15px_0_0_#edf2f4,0_25px_0_0_#1b70f841]
        duration-150
        active:translate-y-2
        active:[box-shadow:0_0px_0_0_#edf2f4,0_0px_0_0_#1b70f841]`}
    >
      {transaction ? (
        <a
          href={`${etherscanUrl}/tx/${transaction[0]?.transactionHash_}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center h-full text-center"
        >
          {formatAmount(transaction[0]?.amount.toString())}
        </a>
      ) : (
        <>+</>
      )}
    </div>
  );
}

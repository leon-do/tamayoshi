import { useState, useEffect } from "react";
import fetchTransactions from "@/utils/fetchTransactions";
import { etherscanUrl } from "@/app/client";

export default function Notification() {
  const [transactions, setTransactions] = useState<Action[] | []>([]);

  useEffect(() => {
    // Fetch immediately on mount
    fetchTransactions().then((tx) => {
      setTransactions(tx);
    });
    // then Fetch every seconds
    const interval = setInterval(() => {
      fetchTransactions().then((tx) => {
        setTransactions(tx);
      });
    }, 5000);
    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sm:w-60 w-1/2 text-center h-40 overflow-y-auto">
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div
            key={transaction.timestamp_}
            className="py-3 my-2 text-center bg-red-100 rounded-lg"
          >
            <a
              href={etherscanUrl + "/tx/" + transaction.transactionHash_}
              target={"_blank"}
            >
              <div className="text-gray-500">+{transaction.amount}</div>
            </a>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import fetchTransactions from "@/utils/fetchTransactions";
import { etherscanUrl } from "@/app/client";

export default function Notification() {
  const [transactions, setTransactions] = useState<Transaction[] | []>([]);

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
    }, 1000);
    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sm:w-96 w-3/4 text-center h-40 overflow-y-auto">
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div
            key={transaction.timestamp_}
            className="border-b border-gray-200 py-3"
          >
            <div className="flex justify-between">
              <div className="text-gray-500">
                <a
                  href={etherscanUrl + "/tx/" + transaction.transactionHash_}
                  target={"_blank"}
                >
                  {transaction.player.slice(0, 6)}...
                  {transaction.player.slice(38)}
                </a>
              </div>
              <div className="text-gray-500">#{transaction.number}</div>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

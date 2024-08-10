"use client";
import { useState, useEffect } from "react";
import isDead from "@/utils/isDead";
import Nav from "@/components/Nav";
import History from "@/components/History";
import Start from "@/components/Start";
import Action from "@/components/Action";
import { useActiveAccount } from "thirdweb/react";

export default function Home() {
  const [dead, setDead] = useState(true);
  const activeAccount = useActiveAccount();

  useEffect(() => {
    if (activeAccount)
      isDead(activeAccount.address).then((x: boolean) => setDead(x));
  }, [activeAccount, dead]);

  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="h-screen grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2 pb-12 gap-y-10 gap-x-5 px-5">
        <Start
          disabled={!!activeAccount || !dead}
          address={activeAccount?.address}
          tailwindStyles="bg-green-400"
        />
        <Action
          disabled={!activeAccount || dead}
          method="eat"
          address={activeAccount?.address}
          tailwindStyles="bg-red-400"
        />
        <Action
          disabled={!activeAccount || dead}
          method="nap"
          address={activeAccount?.address}
          tailwindStyles="bg-yellow-400"
        />
        <Action
          disabled={!activeAccount || dead}
          method="run"
          address={activeAccount?.address}
          tailwindStyles="bg-blue-400"
        />
        <History
          disabled={!activeAccount || dead}
          address={activeAccount?.address}
          tailwindStyles="bg-orange-400"
        />
      </div>
    </div>
  );
}

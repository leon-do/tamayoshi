"use client";
import { useState, useEffect } from "react";
import isDead from "@/utils/isDead";
import Nav from "@/components/Nav";
import Notification from "@/components/Notification";
import Start from "@/components/Start";
import Button from "@/components/Buton";
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
      {<Nav />}
      <div className="flex justify-center items-center ">
        {activeAccount ? <Notification /> : <></>}
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <>
          <Start
            disabled={!!activeAccount || !dead}
            address={activeAccount?.address}
            tailwindStyles="bg-green-400"
          />
          <Button
            disabled={dead}
            method="eat"
            address={activeAccount?.address}
            tailwindStyles="bg-red-400"
          />
          <Button
            disabled={dead}
            method="nap"
            address={activeAccount?.address}
            tailwindStyles="bg-yellow-400"
          />
          <Button
            disabled={dead}
            method="run"
            address={activeAccount?.address}
            tailwindStyles="bg-blue-400"
          />
        </>
      </div>
    </div>
  );
}

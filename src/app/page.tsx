"use client";
import Nav from "@/components/Nav";
import Notification from "@/components/Notification";
import Button from "@/components/Buton";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="flex justify-center items-center ">
        <Notification />
      </div>
      <div className="flex flex-1 justify-center items-center">
        <Button />
      </div>
    </div>
  );
}

"use client";
import BlinkPage from "@/components/blink/BlinkPage";
import Navbar from "@/components/navbar/Navbar";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Blink() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();
  useEffect(() => {
    if (!connected && !publicKey) {
      router.push("/");
    }
  }, [connected, publicKey]);
  return (
    <>
      <Navbar />
      {publicKey && <BlinkPage publicKey={publicKey.toString()} />}
    </>
  );
}

export default Blink;

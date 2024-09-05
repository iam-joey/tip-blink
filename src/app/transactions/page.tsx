"use client";
import Navbar from "@/components/navbar/Navbar";
import Transactions from "@/components/transactions/Transactions";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Page() {
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
      {publicKey && <Transactions address={publicKey.toString()} />}
    </>
  );
}

export default Page;

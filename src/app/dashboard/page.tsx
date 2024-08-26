"use client";
import CreateBlink from "@/components/dashboard/CreateBlink";
import Dashboard from "@/components/dashboard/Dashboard";
import Navbar from "@/components/navbar/Navbar";
import { useGetUserDetails } from "@/hooks/useGetPublicKey";
import { useWallet } from "@solana/wallet-adapter-react";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();

  const { data, isLoading } = useGetUserDetails(publicKey?.toString());

  useEffect(() => {
    if (!connected && !publicKey) {
      router.push("/");
    }
  }, [connected, publicKey]);

  if (!connected || isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />
      {publicKey && data.blink ? (
        <Dashboard />
      ) : (
        <CreateBlink address={publicKey?.toString()} />
      )}
    </>
  );
}

export default page;

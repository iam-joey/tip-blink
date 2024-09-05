"use client";
import CreateBlink from "@/components/dashboard/CreateBlink";
import Dashboard from "@/components/dashboard/Dashboard";
import Loading from "@/components/Loading";
import Navbar from "@/components/navbar/Navbar";
import { useGetUserDetails } from "@/hooks/useGetPublicKey";
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
      {publicKey && <HomePageRender address={publicKey.toString()} />}
    </>
  );
}

export default Page;

function HomePageRender({ address }: { address: string }) {
  const { data, isLoading } = useGetUserDetails(address);

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.data?.blinkCreated) {
    return <CreateBlink address={address} />;
  }

  return (
    <>
      <Dashboard address={address} />
    </>
  );
}

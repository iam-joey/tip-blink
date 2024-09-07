"use client";
import CreateBlink from "@/components/dashboard/CreateBlink";
import Dashboard from "@/components/dashboard/Dashboard";
import Loading from "@/components/Loading";
import Navbar from "@/components/navbar/Navbar";
import { useGetUserBlink } from "@/hooks/useGetUserBlink";
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
  }, [connected, publicKey, router]);

  return (
    <>
      <Navbar />
      {publicKey && <HomePageRender address={publicKey.toString()} />}
    </>
  );
}

export default Page;

function HomePageRender({ address }: { address: string }) {
  const { data, isLoading } = useGetUserBlink(address);
  const router = useRouter();
  if (isLoading) {
    return <Loading />;
  }

  if (!data?.blinkCreated) {
    router.push("/createblink");
    return;
  }

  return (
    <>
      <Dashboard address={address} />
    </>
  );
}

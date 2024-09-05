"use client";

import Navbar from "@/components/navbar/Navbar";
import ReclaimComponent from "@/components/Reclaim";
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
      {/* <Navbar /> */}
      <div className="w-full h-screen">
        {publicKey && <ReclaimComponent address={publicKey.toString()} />}
      </div>
    </>
  );
}

export default Page;

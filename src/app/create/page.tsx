"use client";

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
  }, [connected, publicKey, router]);
  return (
    <>
      <div className="w-full h-screen">
        {publicKey && <ReclaimComponent address={publicKey.toString()} />}
      </div>
    </>
  );
}

export default Page;

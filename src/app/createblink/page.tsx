"use client";
import CreateBlink from "@/components/dashboard/CreateBlink";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Page() {
  const { publicKey } = useWallet();
  const router = useRouter();
  useEffect(() => {
    if (!publicKey) {
      router.push("/");
    }
  }, [publicKey]);

  return <>{publicKey && <CreateBlink address={publicKey.toString()} />}</>;
}

export default Page;

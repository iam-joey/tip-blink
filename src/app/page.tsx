"use client";
import Homepage from "@/components/Homepage";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useGetUserDetails } from "@/hooks/useGetPublicKey";

export default function Home() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();
  const { setTheme } = useTheme();

  const { data, isLoading } = useGetUserDetails(publicKey?.toString());

  useEffect(() => {
    setTheme("");
  }, [setTheme]);

  useEffect(() => {
    if (!isLoading && connected && publicKey) {
      if (data?.exists) {
        router.push("/dashboard");
      } else {
        router.push("/create");
      }
    }
  }, [isLoading, connected, publicKey, data, router]);

  return <Homepage />;
}

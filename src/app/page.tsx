"use client";
import Homepage from "@/components/Homepage";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUser } from "@/lib/actions";

export default function Home() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();

  const fetchUser = async (address: string) => {
    const data = await getUser(address);
    return data.data;
  };

  useEffect(() => {
    const checkUser = async () => {
      if (publicKey && connected) {
        try {
          const value = await fetchUser(publicKey.toString());
          console.log("inside useEffect", value);
          if (!value) {
            router.push("/create");
          } else {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    checkUser();
  }, [connected, publicKey, router]);

  return <Homepage />;
}

"use client";
import React from "react";
import dynamic from "next/dynamic";
import "@solana/wallet-adapter-react-ui/styles.css";
import { UserSetting } from "./UserSettings";
import { useRouter } from "next/navigation";

export const WalletMultiButtonFix = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  {
    ssr: false,
    loading: () => <div className=" p-5  rounded-lg">Loading...</div>,
  }
);

function Navbar() {
  const router = useRouter();
  return (
    <header className="p-3 flex items-center justify-between  border-blue-300">
      <span
        className="text-2xl  font-semibold cursor-pointer"
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        TipBlink
      </span>
      <div className="flex p-2 gap-4 items-center">
        <WalletMultiButtonFix />
        <UserSetting />
      </div>
    </header>
  );
}

export default Navbar;

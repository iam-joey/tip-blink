import { clusterApiUrl, Connection } from "@solana/web3.js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getConnection = () => {
  const connection = new Connection(
    process.env.NEXT_PUBLIC_RPC_END_POINT || clusterApiUrl("devnet"),
    "confirmed"
  );

  return connection;
};

export const BASE_URL =
  process.env.NEXT_PUBLIC_PROD_URL || "http://localhost:3000";

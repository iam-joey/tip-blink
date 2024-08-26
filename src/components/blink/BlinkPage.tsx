import { useGetUserBlink } from "@/hooks/useGetUserBlink";
import React from "react";
import CardView from "./CardView";

export default function BlinkPage({ publicKey }: { publicKey: string }) {
  const { data, isLoading } = useGetUserBlink(publicKey);
  return (
    <div className="text-white p-3 flex justify-center items-center h-[600px] md:h-[700px]">
      <CardView blink={data?.data.blink} />
    </div>
  );
}

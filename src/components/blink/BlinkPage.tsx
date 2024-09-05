import { useGetUserBlink } from "@/hooks/useGetUserBlink";
import React from "react";
import Loading from "../Loading";
import BlinkRender from "./BlinkRender";

export default function BlinkPage({ publicKey }: { publicKey: string }) {
  const { data, isLoading } = useGetUserBlink(publicKey);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className=" p-3 flex justify-center items-center ">
      {data && data.data?.blink && (
        <BlinkRender
          title={data.data.blink.title}
          description={data.data.blink.description}
          imageUrl={data.data.blink.icon}
          address={publicKey}
        />
      )}
    </div>
  );
}

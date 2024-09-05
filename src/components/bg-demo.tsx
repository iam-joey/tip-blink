"use client";
import React from "react";
import { BackgroundBeams } from "./ui/bg-beam";
import { WalletMultiButtonFix } from "./navbar/Navbar";
import { Cover } from "./ui/cover";
import { Button } from "./ui/moving-border";

export function HomepageRender() {
  return (
    <div className="h-screen  w-full  bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <div className="p-3 flex justify-center items-center w-full">
          <Button className="uppercase text-xl font-mono  font-bold text-blue-400">
            Devnet
          </Button>
        </div>
        <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6   text-slate-300 ">
          Build{" "}
          <span className="text-blue-400 font-serif font-bold uppercase text-4xl">
            blink
          </span>{" "}
          to receive tips <br /> at <Cover>warp speed</Cover>
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-md text-center relative z-10">
          Create your own Blink, a blink where you can receive tips from your
          twitter followers.
        </p>
      </div>
      <BackgroundBeams />
      <div className="p-4">
        <WalletMultiButtonFix />
      </div>
    </div>
  );
}

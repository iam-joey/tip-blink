import React from "react";
import { CreateBlinkPage } from "../CreateBlinkPage";
import Navbar from "../navbar/Navbar";

function CreateBlink({ address }: { address: string }) {
  return (
    <>
      <Navbar />
      <div className="w-full p-4">
        <CreateBlinkPage address={address} />
      </div>
    </>
  );
}

export default CreateBlink;

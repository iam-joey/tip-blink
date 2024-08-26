import React from "react";
import { CreateBlinkPage } from "../UploadImageDemo";

function CreateBlink({ address }: { address?: string }) {
  return (
    <div className="w-full p-4">
      <CreateBlinkPage address={address} />
    </div>
  );
}

export default CreateBlink;

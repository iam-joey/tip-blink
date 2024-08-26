"use client";
import React, { useState } from "react";
import { Reclaim } from "@reclaimprotocol/js-sdk";
import QRCode from "react-qr-code";
import { Button } from "./ui/button";
import CopyLink from "./CopyLink";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import prisma from "../../prisma";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { UserSchemaType } from "@/utils/validation";

function ReclaimComponent() {
  const APP_ID = "0x2C734A99376a99A403177B11eb5F3CE1BDdF1477";
  const reclaimClient = new Reclaim.ProofRequest(APP_ID);
  const [url, setUrl] = useState("");
  const router = useRouter();
  const { publicKey } = useWallet();
  console.log(publicKey?.toString());
  async function generateVerificationRequest() {
    if (!publicKey) return;
    const providerIds = [
      "39c31ffd-0be0-4e45-9a18-1eb3cb8099d4", // DSID Twitter Username
    ];
    const providerId = providerIds[0]; //TODO: replace with your provider ids you had selected while creating the application

    await reclaimClient.buildProofRequest(providerId);

    const APP_SECRET =
      "0x3d6bcb63eb3a7cae366f57044ca1f15ddd9c666eb27bc6b8b5a22ef75c235495"; // your app secret key.

    reclaimClient.setSignature(
      await reclaimClient.generateSignature(APP_SECRET)
    );

    const { requestUrl, statusUrl } =
      await reclaimClient.createVerificationRequest();

    setUrl(requestUrl);

    await reclaimClient.startSession({
      onSuccessCallback: async (proof) => {
        console.log("Verification success", proof[0]);
        const data = proof[0].claimData.context;
        const values: ValueTypes = JSON.parse(data);
        interface ValueTypes {
          extractedParameters: {
            username: string;
          };
        }
        console.log(values.extractedParameters.username);
        toast.success(
          `verified your twitter, welcome ${values.extractedParameters.username}`
        );
        const user: UserSchemaType = {
          twitterUsername: values.extractedParameters.username,
          walletAddress: publicKey.toString(),
        };
        const userCreateRequest = await axios.post(
          "http://localhost:3000/api/create",
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(userCreateRequest.data);
        router.push("/dashboard");
      },
      onFailureCallback: (error) => {
        console.error("Verification failed", error);
        toast.warning("something went wrong while verification");
      },
    });
  }
  return (
    <div className=" flex flex-col gap-2 items-center p-3">
      <h1 className="uppercase text-2xl font-mono font-semibold">
        Verify your twitter using zkProof
      </h1>
      {!url && (
        <Button className="mt-3" onClick={generateVerificationRequest}>
          Verify
        </Button>
      )}
      {url && (
        <div className=" rounded-md flex flex-col justify-center items-center gap-4 p-3">
          <QRCode className="border border-white" value={url} />
          <CopyLink text={url} />
          <Button className="mt-3" onClick={generateVerificationRequest}>
            Generate new Qr code
          </Button>
        </div>
      )}
    </div>
  );
}

export default ReclaimComponent;

"use client";
import React, { useEffect, useState } from "react";
import { Reclaim } from "@reclaimprotocol/js-sdk";
import QRCode from "react-qr-code";
import { Button } from "./ui/button";
import CopyLink from "./CopyLink";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserSchemaType } from "@/utils/validation";
import { createUser } from "@/lib/actions";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButtonFix } from "./navbar/Navbar";

function ReclaimComponent({ address }: { address: string }) {
  const APP_ID = process.env.NEXT_PUBLIC_RECLAIM_APP_ID as string;
  const reclaimClient = new Reclaim.ProofRequest(APP_ID);
  const [url, setUrl] = useState("");
  const router = useRouter();
  const { publicKey, connected } = useWallet();
  useEffect(() => {
    if (!publicKey) {
      router.push("/");
    }
  }, [publicKey, connected, router]);

  async function generateVerificationRequest() {
    const providerIds = ["39c31ffd-0be0-4e45-9a18-1eb3cb8099d4"];
    const providerId = providerIds[0];

    await reclaimClient.buildProofRequest(providerId);

    const APP_SECRET = process.env.NEXT_PUBLIC_RECLAIM_APP_SECRET as string;

    reclaimClient.setSignature(
      await reclaimClient.generateSignature(APP_SECRET)
    );

    const { requestUrl, statusUrl } =
      await reclaimClient.createVerificationRequest();

    setUrl(requestUrl);

    await reclaimClient.startSession({
      onSuccessCallback: async (proof) => {
        // console.log("Verification success", proof[0]);
        const data = proof[0].claimData.context;
        const values: ValueTypes = JSON.parse(data);
        interface ValueTypes {
          extractedParameters: {
            username: string;
          };
        }
        toast.success(
          `verified your twitter, welcome ${values.extractedParameters.username}`
        );
        const user: UserSchemaType = {
          twitterUsername: values.extractedParameters.username,
          walletAddress: address,
        };
        const res = await createUser(user);
        if (res.err) {
          toast.warning(`${res.msg}`);
          return;
        }
        toast.success(`${res.msg}`);
        router.push("/dashboard");
      },
      onFailureCallback: (error) => {
        console.error("Verification failed", error);
        toast.warning("something went wrong while verification");
      },
    });
  }

  return (
    <>
      {publicKey && (
        <>
          <div className=" flex flex-col gap-2 items-center p-3 justify-center w-full h-[700px]">
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
            <div className="w-full flex items-center justify-center p-5">
              <WalletMultiButtonFix />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ReclaimComponent;

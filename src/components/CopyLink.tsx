"use client";
import React, { useState } from "react";
import { toast } from "sonner";

function CopyLink({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copyLink = async () => {
    try {
      setCopied(true);
      setTimeout(() => setCopied(false), 500);
      navigator.clipboard.writeText(text).then(() => {
        toast.success("Link Copied");
      });
    } catch (error) {
      toast.warning("something went wrong while coping");
    }
  };
  return (
    <div className="rounded-md p-2 h-10 bg-slate-100 flex gap-2">
      {text}
      {<CopySvg copyLink={copyLink} />}
    </div>
  );
}

export default CopyLink;

function CopySvg({ copyLink }: { copyLink: () => void }) {
  return (
    <button onClick={copyLink}>
      <svg
        className="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"
        />
      </svg>
    </button>
  );
}

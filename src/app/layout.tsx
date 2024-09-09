import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/contextproviders/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tip-Blink",
  description: "Build your own blinks to receive tips in a blink",
  openGraph: {
    title: "Tip-Blink",
    description: "create blinks for receiving tips in twitter - Solana",
    url: "https://www.tipblink.xyz/",
    images:
      "https://raw.githubusercontent.com/iam-joey/tip-blink/main/image.png",
  },
  other: {
    "dscvr:canvas:version": "vNext",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-100`}>
        <Providers>
          <div className="">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

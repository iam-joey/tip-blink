"use client";

// import {
//   useWallet,
//   useConnection,
//   WalletContextState,
//   ConnectionContextState,
// } from "@solana/wallet-adapter-react";
// import React, { createContext, useContext, useEffect, useState } from "react";

// interface State {
//   wallet: boolean;
// }

// export const WalletContext = createContext<boolean>(false);

// export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { connected, publicKey } = useWallet();
//   const connection = useConnection();
//   const [state, setState] = useState<boolean>(false);

//   useEffect(() => {
//     if (connected && publicKey) {
//       setState(true);
//     }
//   }, [connected, publicKey]);

//   return (
//     <WalletContext.Provider value={state}>{children}</WalletContext.Provider>
//   );
// };

// export const useWalletContext = () => {
//   const context = useContext(WalletContext);
//   // console.log("1", context);
//   if (!context) {
//     // return { wallet: false, connection: false };
//     return false;
//   }
//   return context;
// };

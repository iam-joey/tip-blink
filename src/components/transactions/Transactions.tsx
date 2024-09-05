import React from "react";
import TransactionsGrid from "./TransactionsGrid";
import Loading from "../Loading";
import { useGetPaymnetsHistory } from "@/hooks/useGetPaymenstHistory";

function Transactions({ address }: { address: string }) {
  const { data, isLoading } = useGetPaymnetsHistory(address);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {data && data?.data && (
        <TransactionsGrid address={address} paymentsData={data.data} />
      )}
    </>
  );
}

export default Transactions;

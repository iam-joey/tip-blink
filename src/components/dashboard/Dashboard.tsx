import React from "react";
import TotalAmount from "./TotalAmount";
import TotalUsers from "./TotalUsers";
import TransactionsHistoryView from "./TransactionsHistory";
import ChartView from "./BarCharts";
import { useGetAmountAndSupports } from "@/hooks/useGetAmountAndUsers";
import Loading from "../Loading";

function Dashboard({ address }: { address: string }) {
  return (
    <div className="  space-x-3 flex flex-col justify-center items-center md:flex-row p-2 md:h-[780px]">
      <div className="flex flex-col flex-1 rounded-md p-3">
        <div className="flex gap-5 px-3   justify-center">
          <Cards address={address} />
        </div>
        <div className="flex-1 px-2 mt-3">
          <ChartView address={address} />
        </div>
      </div>
      <div className="border border-sla flex-1  max-w-[440px] mt-2 md:mt-0">
        <TransactionsHistoryView address={address} />
      </div>
    </div>
  );
}

export default Dashboard;

function Cards({ address }: { address: string }) {
  const { data, isLoading } = useGetAmountAndSupports(address);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex-1 max-w-[300px]">
        {data && data.data && <TotalAmount amount={data.data.totalAmount} />}
      </div>
      <div className="flex-1 max-w-[300px]">
        {data && data.data && <TotalUsers users={data.data.members} />}{" "}
      </div>
    </>
  );
}

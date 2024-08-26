import React from "react";
import TotalAmount from "./TotalAmount";
import TotalUsers from "./TotalUsers";
import TransactionsHistoryView from "./TransactionsHistory";
import ChartView from "./BarCharts";

function Dashboard() {
  return (
    <div className="space-x-3 flex flex-col justify-center items-center md:flex-row p-2 md:h-[780px]  border-red-50">
      <div className="flex flex-col flex-1 rounded-md border p-3">
        <div className="flex gap-5 px-3   justify-center">
          <div className="flex-1 max-w-[300px]">
            <TotalAmount />
          </div>
          <div className="flex-1 max-w-[300px]">
            <TotalUsers />
          </div>
        </div>
        <div className="flex-1 px-2 mt-3">
          <ChartView />
        </div>
      </div>
      <div className=" flex-1  max-w-[440px] mt-2 md:mt-0">
        <TransactionsHistoryView />
      </div>
    </div>
  );
}

export default Dashboard;

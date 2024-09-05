"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetLatestTransactions } from "@/hooks/useGetLatestPayments";
import Loading from "../Loading";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function TransactionsHistoryView({
  address,
}: {
  address: string;
}) {
  interface dataState {
    senderAddress: string;
    amount: string;
  }

  const { data: paymentsData, isLoading } = useGetLatestTransactions(address);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Recent Tips</CardTitle>
          <CardDescription>
            Recent payments from your supporters.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/transactions">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentsData && paymentsData.data && (
              <>
                {paymentsData.data.map(({ amount, senderAddress }, index) => (
                  <TableCellView
                    key={index}
                    address={senderAddress}
                    amount={amount}
                  />
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function TableCellView({
  address,
  amount,
}: {
  address: string;
  amount: string;
}) {
  return (
    <>
      <TableRow>
        <TableCell>
          <div className="font-medium">{address}</div>
        </TableCell>
        <TableCell className="text-right">
          ${(parseFloat(amount) / LAMPORTS_PER_SOL).toFixed(2)} SOL
        </TableCell>
      </TableRow>
    </>
  );
}

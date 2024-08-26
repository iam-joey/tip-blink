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

export default function TransactionsHistoryView() {
  interface dataState {
    address: string;
    amount: string;
  }
  const data: dataState[] = [
    {
      address: "joey@gmail",
      amount: "432",
    },
    {
      address: "joey@gmail",
      amount: "432",
    },

    {
      address: "joey@gmail",
      amount: "432",
    },
    {
      address: "joey@gmail",
      amount: "432",
    },
    {
      address: "joey@gmail",
      amount: "432",
    },
    {
      address: "joey@gmail",
      amount: "432",
    },
    {
      address: "joey@gmail",
      amount: "432",
    },
    {
      address: "joey@gmail",
      amount: "432",
    },
    {
      address: "joey@gmail",
      amount: "432",
    },
  ];
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
          <Link href="#">
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
            {data.map(({ amount, address }) => (
              <TableCellView address={address} amount={amount} />
            ))}
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
          ${parseFloat(amount).toFixed(2).toString()}
        </TableCell>
      </TableRow>
    </>
  );
}

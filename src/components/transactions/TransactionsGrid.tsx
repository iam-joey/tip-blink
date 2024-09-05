"use client";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Payments } from "@prisma/client";
import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function TransactionsGrid({
  address,
  paymentsData,
}: {
  address: string;
  paymentsData: Partial<Payments>[];
}) {
  const rowPerPages = 10;
  const [data, SetData] = useState<Partial<Payments>[]>(paymentsData);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(rowPerPages);
  return (
    <Card className="m-4">
      <CardHeader className="px-7">
        <CardTitle>Tips</CardTitle>
        <CardDescription>Recent tips.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.slice(start, end).map((payment) => (
              <TableRowView
                amount={payment.amount}
                createdAt={payment.createdAt}
                key={payment.id}
                senderAddress={payment.senderAddress}
                status={payment.status}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  setStart(start - rowPerPages);
                  setEnd(end - rowPerPages);
                }}
                className={
                  start == 0
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={
                  end >= data.length
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
                onClick={() => {
                  if (end < data.length) {
                    setStart(start + rowPerPages);
                    setEnd(end + rowPerPages);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}

function TableRowView(data: Partial<Payments>) {
  function beautifyDateWithDayjs(isoDateString: string): string {
    return dayjs(isoDateString).format("dddd, MMMM D, YYYY");
  }

  return (
    <>
      <TableRow className="">
        <TableCell>
          <div className="font-medium">{data.senderAddress}</div>
        </TableCell>
        <TableCell className="hidden sm:table-cell">
          <Badge className="text-xs">{data.status}</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {beautifyDateWithDayjs(data.createdAt!.toString())}
        </TableCell>
        <TableCell className="text-right">
          {(Number(data.amount) / LAMPORTS_PER_SOL).toFixed(2)} SOL
        </TableCell>
      </TableRow>
    </>
  );
}

"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { day: "Mon", earned: 120 },
  { day: "Tue", earned: 200 },
  { day: "Wed", earned: 150 },
  { day: "Thu", earned: 80 },
  { day: "Fri", earned: 290 },
  { day: "Sat", earned: 350 },
  { day: "Sun", earned: 220 },
];

export default function Component() {
  const formatYAxis = (value: number) => `$${value}`;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Tips earned per day</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis tickFormatter={formatYAxis} />
              <Bar dataKey="earned" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

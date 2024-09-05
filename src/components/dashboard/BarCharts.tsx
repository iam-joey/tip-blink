import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetLast7DaysData } from "@/hooks/useGet7DaysTips";
import Loading from "../Loading";

const chartConfig = {
  orders: {
    label: "amountReceived",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Component({ address }: { address: string }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };
  const { data: tipsData, isLoading } = useGetLast7DaysData(address);

  const formatYAxis = (value: number) => `$${value}`;

  if (isLoading) {
    return <Loading />;
  }
  const hasData =
    tipsData?.data && Number(tipsData.data.totalAmountReceived) > 0;
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Tips earned per day</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          {hasData ? (
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart accessibilityLayer data={tipsData.data.dailyBreakdown}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={formatDate}
                />
                <YAxis
                  dataKey="amountReceived"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="amountReceived"
                  fill="var(--color-orders)"
                  radius={8}
                />
              </BarChart>
            </ChartContainer>
          ) : (
            <p className="text-xl w-full h-full uppercase font-semibold flex items-center justify-center">
              No payments received in the last 7 days.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

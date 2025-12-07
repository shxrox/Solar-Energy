import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { format, toDate } from "date-fns";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";

const DataChart = ({ solarUnitId }) => {
  const [selectedRange, setSelectedRange] = useState("7");

  const { data, isLoading, isError, error } =
    useGetEnergyGenerationRecordsBySolarUnitQuery({
      id: solarUnitId,
      groupBy: "date",
      limit: parseInt(selectedRange),
    });

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  if (isLoading) return null;

  if (!data || isError) {
    return null;
  }

  const lastSelectedRangeDaysEnergyProduction = data
    .slice(0, parseInt(selectedRange))
    .map((el) => {
      return {
        date: format(toDate(el._id.date), "MMM d"),
        energy: el.totalEnergy,
      };
    });

  const chartConfig = {
    energy: {
      label: "Energy (kWh)",
      color: "oklch(54.6% 0.245 262.881)",
    },
  };

  const title = "Energy Production Chart";

  return (
    <Card className="rounded-md p-4">
      <div className="flex justify-between items-center gap-2">
        <h2 className="text-xl font-medium text-foreground">{title}</h2>
        <div>
          <Select value={selectedRange} onValueChange={handleRangeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                className="text-foreground"
                placeholder="Select Range"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 Days</SelectItem>
              <SelectItem value="30">30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={lastSelectedRangeDaysEnergyProduction}
            margin={{
              left: 40,
              right: 20,
              top: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tick={false}
              label={{ value: "Date", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickCount={10}
              label={{ value: "kWh", angle: -90, position: "insideLeft" }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="energy"
              type="natural"
              fill="var(--color-energy)"
              fillOpacity={0.4}
              stroke="var(--color-energy)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default DataChart;

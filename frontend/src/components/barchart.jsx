"use client"

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  week: {
    label: "Week Number",
    color: "#6366f1",
  },
}

export default function Barchart({ data }) {
  return (
    <div className="w-full text-center pt-10 sm:pt-14">
      <h1 className="text-2xl font-semibold text-slate-200 relative inline-block mb-5">
        Week Per Skill
        <span className="absolute left-0 bottom-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-md"></span>
      </h1>
      <ChartContainer config={chartConfig} className="min-h-[600px] w-full mb-5">
        <BarChart
          layout="vertical" 
          data={data}
          margin={{ top: 20, right: 20, left: 10, bottom: 50 }}
          barCategoryGap={20}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            label={{
              value: "Week",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            type="category"
            dataKey="objective"
            tickLine={false}
            axisLine={false}
            width={150}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="week"
            fill="var(--color-week)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

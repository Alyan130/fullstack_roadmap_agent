"use client"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts"

import { ChartContainer} from "./ui/chart"



const COLORS = ["#3b82f6", "#6366f1", "#10b981"] 

const chartConfig = {
  confidence: {
    label: "Confidence",
    color: "#3b82f6",
  },
} 

export default function Piechart({data}) {
  return (
    <div className="w-full text-center pt-4 pb-4">
    <h1 className="text-2xl font-semibold text-slate-200 relative inline-block">
    Skill Boost Analytics
    <span className="absolute left-0 bottom-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-md"></span>
  </h1>
  
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <PieChart width={450} height={350}>
        <Pie
          data={data}
          dataKey="confidence"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ChartContainer>
    </div>
  )
}

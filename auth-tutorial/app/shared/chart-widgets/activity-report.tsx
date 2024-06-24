"use client";

import { Title, Text } from "rizzui";
import WidgetCard from "@/components/cards/widget-card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { CustomTooltip } from "@/components/charts/custom-tooltip";
import { PiDownloadSimple, PiUploadSimple } from "react-icons/pi";
import SimpleBar from "@/components/ui/simplebar";
import { useMedia } from "@/hooks/use-media";
import { Banknote, PartyPopper } from "lucide-react";

const data = [
  {
    month: "Jan",
    events: 2000,
    bookings: 1000,
  },
  {
    month: "Feb",
    events: 4200,
    bookings: 3700,
  },
  {
    month: "Mar",
    events: 3000,
    bookings: 5800,
  },
  {
    month: "Apr",
    events: 5780,
    bookings: 3908,
  },
  {
    month: "May",
    events: 4080,
    bookings: 2500,
  },
  {
    month: "Jun",
    events: 2300,
    bookings: 5200,
  },
  {
    month: "Jul",
    events: 4890,
    bookings: 6500,
  },
  {
    month: "Aug",
    events: 3780,
    bookings: 4908,
  },
  {
    month: "Sep",
    events: 5800,
    bookings: 2800,
  },
  {
    month: "Oct",
    events: 6000,
    bookings: 1908,
  },
  {
    month: "Nov",
    events: 2780,
    bookings: 3908,
  },
  {
    month: "Dec",
    events: 7500,
    bookings: 3000,
  },
];

export default function ActivityReport({ className }: { className?: string }) {
  const isTablet = useMedia("(max-width: 800px)", false);

  return (
    <WidgetCard
      title={"Activity"}
      titleClassName="text-lg xl:text-xl font-semibold"
      className={className}
    >
      <div className="mt-3 flex items-start 2xl:mt-5">
        <div className="me-9 flex items-start">
          <div className="me-3 rounded bg-[#00D1FF] p-2 text-white">
            <PartyPopper className="h-6 w-6" />
          </div>
          <div>
            <Text className="text-gray-500">Events</Text>
            <Text className="font-lexend text-sm font-semibold text-gray-900 2xl:text-base dark:text-gray-700">
              15,556
            </Text>
          </div>
        </div>
        <div className="flex items-start">
          <div className="me-3 rounded bg-[#6B46FF] p-2 text-white">
            <Banknote className="h-6 w-6" />
          </div>
          <div>
            <Text className="text-gray-500">Bookings</Text>
            <Text className="font-lexend text-sm font-semibold text-gray-900 2xl:text-base dark:text-gray-700">
              10,065
            </Text>
          </div>
        </div>
      </div>
      <SimpleBar>
        <div className="h-96 w-full pt-9">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: "700px" })}
          >
            <AreaChart
              data={data}
              margin={{
                left: -16,
              }}
              className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <defs>
                <linearGradient id="events" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6B46FF" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#6B46FF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="bookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D1FF" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#00D1FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                className=" "
              />
              <YAxis tickLine={false} className=" " />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="events"
                stroke="#6B46FF"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#events)"
              />
              <Area
                type="monotone"
                dataKey="bookings"
                stroke="#00D1FF"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#bookings)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}

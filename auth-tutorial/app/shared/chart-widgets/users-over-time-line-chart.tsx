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
import {
  PiAddressBook,
  PiDownloadSimple,
  PiUploadSimple,
  PiUser,
} from "react-icons/pi";
import SimpleBar from "@/components/ui/simplebar";
import { useMedia } from "@/hooks/use-media";
import { Banknote, PartyPopper } from "lucide-react";

type UserData = {
  month: string;
  users: number;
};

interface UsersTimeLineChartProps {
  className?: string;
  data: UserData[];
}

export default function UsersTimeLineChart({
  className,
  data,
}: UsersTimeLineChartProps) {
  const isTablet = useMedia("(max-width: 800px)", false);

  return (
    <WidgetCard
      title={"Users Over Time"}
      titleClassName="text-lg xl:text-xl font-semibold"
      className={className}
    >
      <div className="mt-3 flex items-start 2xl:mt-5">
        <div className="me-9 flex items-start">
          <div className="me-3 rounded bg-[#00D1FF] p-2 text-white">
            <PiUser className="h-6 w-6" />
          </div>
          <div>
            <Text className="text-gray-500">Users</Text>
            <Text className="font-lexend text-sm font-semibold text-gray-900 2xl:text-base dark:text-gray-700">
              {data.reduce((acc, curr) => acc + curr.users, 0)}
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
                <linearGradient id="users" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="users"
                stroke="#6B46FF"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#users)"
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

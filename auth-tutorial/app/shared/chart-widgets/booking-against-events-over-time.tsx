"use client";

import WidgetCard from "@/components/cards/widget-card";
import { Title, Text, Badge } from "rizzui";
import cn from "@/utils/class-names";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMedia } from "@/hooks/use-media";
import { CustomTooltip } from "@/components/charts/custom-tooltip";
import TrendingUpIcon from "@/components/icons/trending-up";
import SimpleBar from "@/components/ui/simplebar";

function CustomYAxisTick({ x, y, payload }: any) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={19} textAnchor="end" className="fill-gray-500">
        {`${payload.value.toLocaleString()}`}
      </text>
    </g>
  );
}

interface EventsAgainstBookingProps {
  data: {
    month: string;
    events: number;
    bookings: number;
  }[];
  className?: string;
}

export default function EventsAgainstBooking({
  data,
  className,
}: EventsAgainstBookingProps) {
  const isMobile = useMedia("(max-width: 768px)", false);
  const isDesktop = useMedia("(max-width: 1440px)", false);
  const is2xl = useMedia("(max-width: 1780px)", false);
  const isTablet = useMedia("(max-width: 800px)", false);

  return (
    <WidgetCard
      title={"Total Events & Bookings Over Time"}
      titleClassName="font-normal text-gray-700 sm:text-base font-inter"
      description={
        <div className="flex items-center justify-start">
          <Title as="h2" className="me-2 font-semibold">
            {data.reduce((acc, curr) => acc + curr.events, 0)}
          </Title>
          <Text className="flex items-center leading-none text-gray-500">
            <Text
              as="span"
              className={cn(
                "me-2 inline-flex items-center font-medium text-green"
              )}
            >
              <TrendingUpIcon className="me-1 h-4 w-4" />
              {/* 32.40% */}
              {data.reduce((acc, curr) => acc + curr.events, 0) / 100}%
            </Text>
            last year
          </Text>
        </div>
      }
      descriptionClassName="text-gray-500 mt-1.5"
      action={
        <div className=" @2xl:block">
          <Badge renderAsDot className="me-0.5 bg-[#282ECA]" /> Events
          <Badge renderAsDot className="me-0.5 ms-4 bg-[#96C0FF]" /> Bookings
        </div>
      }
      className={className}
    >
      <SimpleBar>
        <div className="h-96 w-full pt-9">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: "700px" })}
          >
            <BarChart
              data={data}
              barSize={isMobile ? 16 : isDesktop ? 28 : is2xl ? 32 : 46}
              margin={{
                left: 16,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={<CustomYAxisTick />}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="events" fill="#282ECA" stackId="a" />
              {/* <Bar dataKey="bookings" stackId="a" fill="#4052F6" /> */}
              <Bar dataKey="bookings" stackId="a" fill="#96C0FF" />
              {/* <Bar dataKey="music" stackId="a" fill="#DEEAFC" /> */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}

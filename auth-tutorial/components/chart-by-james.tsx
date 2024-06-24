"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { addMonths, format, startOfMonth, subMonths } from "date-fns";
import { getEventsData } from "@/actions/admin";

async function processData() {
  //   const events = await getEventsData()
  //   const months = Array.from({ length: 10 }, (_, i) => format(subMonths(new Date(), i), 'yyyy-MM'))

  const events = await getEventsData();
  const now = new Date();
  const startMonth = subMonths(startOfMonth(now), 3);
  const endMonth = addMonths(startOfMonth(now), 6);

  // Generate an array of months from startMonth to endMonth
  const months = [];
  let currentMonth = startMonth;
  while (currentMonth <= endMonth) {
    months.push(format(currentMonth, "yyyy-MM"));
    currentMonth = addMonths(currentMonth, 1);
  }

  const data = months?.map((month) => {
    const totalEvents = events?.filter(
      (event) =>
        event.date && format(new Date(event?.date), "yyyy-MM") === month
    )?.length;
    const publishedEvents = events?.filter(
      (event) =>
        event.date &&
        event?.status === "PUBLISHED" &&
        format(new Date(event?.date), "yyyy-MM") === month
    )?.length;
    const rejectedEvents = events?.filter(
      (event) =>
        event.date &&
        event?.status === "REJECTED" &&
        format(new Date(event?.date), "yyyy-MM") === month
    )?.length;
    const archivedEvents = events?.filter(
      (event) =>
        event.date &&
        event?.status === "ARCHIVED" &&
        format(new Date(event?.date), "yyyy-MM") === month
    )?.length;
    return {
      month,
      totalEvents,
      publishedEvents,
      rejectedEvents,
      archivedEvents,
    };
  });

  return data;
}

const Charts = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      const processedData = await processData();
      setData(processedData);
    }

    fetchData();
  }, []);
  useEffect(() => console.log("data:: ", data), [data]);

  return (
    <div>
      <h2>Event Data</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalEvents" fill="#8884d8" name="Total Events" />
              <Bar
                dataKey="publishedEvents"
                fill="#82ca9d"
                name="Published Events"
              />
              <Bar
                dataKey="archivedEvents"
                fill="#cccccc"
                name="Archived Events"
              />
              <Bar
                type="monotone"
                dataKey="rejectedEvents"
                fill="#ff7300"
                name="Rejected Events"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                type="monotone"
                dataKey="totalEvents"
                fill="#8884d8"
                name="Total Events"
              />
              <Bar
                type="monotone"
                dataKey="rejectedEvents"
                fill="#ff7300"
                name="Rejected Events"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;

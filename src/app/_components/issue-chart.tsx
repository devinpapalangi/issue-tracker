"use client";

import React from "react";
import { IssueSumary } from "../_types";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  issueSummary: IssueSumary;
}

const IssueChart = ({ issueSummary }: Props) => {
  const chartData = [
    {
      label: "Open",
      value: issueSummary.open,
    },
    {
      label: "In Progress",
      value: issueSummary.inProgress,
    },
    {
      label: "Closed",
      value: issueSummary.closed,
    },
  ];

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey={"label"} />
        <YAxis />
        <Bar
          dataKey={"value"}
          barSize={60}
          style={{
            fill: "var(--accent-9",
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IssueChart;

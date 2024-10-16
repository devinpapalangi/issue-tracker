import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { IssueSumary } from "../_types";
import { IssueStatus } from "@prisma/client";
import Link from "next/link";

interface Props {
  issueSummary: IssueSumary;
}

const IssueSummary = ({ issueSummary }: Props) => {
  const containers: { label: string; count: number; status: IssueStatus }[] = [
    {
      label: "Open Issues",
      count: issueSummary.open,
      status: "OPEN",
    },
    {
      label: "In Progress Issues",
      count: issueSummary.inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Closed Issues",
      count: issueSummary.open,
      status: "CLOSED",
    },
  ];
  return (
    <Flex gap={"4"} className="mb-5">
      {containers.map(({ label, count, status }) => (
        <Card key={label}>
          <Flex direction={"column"} gap={"1"}>
            <Link
              className="text-sm font-medium"
              href={`/issues?status=${status}`}
            >
              {label}
            </Link>
            <Text size={"5"} className="font-bold">
              {count}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;

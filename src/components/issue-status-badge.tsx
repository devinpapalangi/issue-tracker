import React from "react";
import { IssueStatus } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import { stat } from "fs";

interface Props {
  status: IssueStatus;
}

interface StatusBadgeProps {
  label: string;
  color: "red" | "violet" | "green";
}

const IssueStatusBadge = ({ status }: Props) => {
  const statusMap: Record<string, StatusBadgeProps> = {
    OPEN: {
      label: "Open",
      color: "red",
    },
    IN_PROGRESS: {
      label: "In Progress",
      color: "violet",
    },
    CLOSED: {
      label: "Closed",
      color: "green",
    },
  };

  return (
    <Badge color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;

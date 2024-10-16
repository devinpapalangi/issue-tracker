import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./_components/issue-chart";
import prisma from "../../prisma/client";
import IssueSummary from "./_components/issue-summary";
import LatestIssues from "./_components/latest-issues";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Flex direction={"column"} gap={"5"}>
        <IssueSummary issueSummary={{ open, inProgress, closed }} />

        <IssueChart issueSummary={{ open, inProgress, closed }} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};

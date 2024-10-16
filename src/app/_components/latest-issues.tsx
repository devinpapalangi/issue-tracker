import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import prisma from "../../../prisma/client";
import Link from "next/link";
import { IssueStatusBadge } from "@/components";

const LatestIssues = async () => {
  const latestIssue = await prisma.issue.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      assignedUser: true,
    },
  });
  return (
    <Card>
      <Heading size={"4"} mb={"4"}>
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {latestIssue.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify={"between"} gap={"2"} align={"center"}>
                  <Flex direction={"column"} gap={"2"} align={"start"}>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedUser && (
                    <Avatar
                      src={issue.assignedUser.image!}
                      fallback="?"
                      size={"2"}
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;

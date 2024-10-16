import { CustomLink, IssueStatusBadge } from "@/components";
import { Flex, Table } from "@radix-ui/themes";
import delay from "delay";
import prisma from "../../../prisma/client";
import IssueActions from "./_components/issue-actions";
import { Issue, IssueStatus } from "@prisma/client";
import { stat } from "fs";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { IssueQuery } from "./_types";
import Pagination from "@/components/pagination";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(IssueStatus);

  const status = statuses.includes(searchParams.status as IssueStatus)
    ? searchParams.status
    : undefined;

  //TODO change to using dropdown
  const pageSize = 10;
  const currentPage = parseInt(searchParams.page) || 1;

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    {
      label: "Issue",
      value: "title",
    },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]:
          searchParams.direction === "asc" ? "asc" : "desc",
      }
    : undefined;
  const where = {
    status,
  };
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const issuesCount = await prisma.issue.count({
    where,
  });

  return (
    <>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className || ""}
              >
                <Link
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      direction:
                        searchParams.orderBy === column.value
                          ? searchParams.direction === "asc"
                            ? "desc"
                            : "asc"
                          : "asc",
                    },
                  }}
                >
                  {column.label}
                </Link>
                {searchParams.orderBy === column.value ? (
                  searchParams.direction === "asc" ? (
                    <ArrowUpIcon className="inline" />
                  ) : (
                    <ArrowDownIcon className="inline" />
                  )
                ) : null}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <CustomLink href={`/issues/${issue.id}`}>
                  {issue.title}
                </CustomLink>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {" "}
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        dataCount={issuesCount}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;

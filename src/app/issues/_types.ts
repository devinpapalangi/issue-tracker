import { IssueStatus, Issue } from "@prisma/client";

export interface IssueQuery {
  status: IssueStatus;
  orderBy: keyof Issue;
  direction: "asc" | "desc";
  page: string;
}

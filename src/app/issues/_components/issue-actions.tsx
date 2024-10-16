import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./issue-status-filter";

const IssueActions = () => {
  return (
    <Flex mb={"5"} gap={"2"} justify={"between"}>
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;

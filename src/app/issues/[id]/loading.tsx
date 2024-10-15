import { Skeleton } from "@/components";
import { Flex, Card, Box } from "@radix-ui/themes";
import React from "react";
const LoadinIssueDetailPage = async () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex my={"2"} gap={"3"}>
        <Skeleton width={"5rem"} />
        <Skeleton width={"8rem"} />
      </Flex>
      <Card className="prose" mt={"4"}>
        <Skeleton count={10} />
      </Card>
    </Box>
  );
};

export default LoadinIssueDetailPage;

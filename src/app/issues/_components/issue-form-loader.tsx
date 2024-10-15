import { Skeleton } from "@/components";
import { Box } from "@radix-ui/themes";
import React from "react";

const IssueFormLoader = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height={"20rem"} />
    </Box>
  );
};

export default IssueFormLoader;

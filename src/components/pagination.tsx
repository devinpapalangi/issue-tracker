"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  dataCount: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = ({ dataCount, currentPage, pageSize }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPage = Math.ceil(dataCount / pageSize);

  if (totalPage <= 1) {
    return null;
  }

  const onChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Flex align={"center"} gap={"2"} justify={"between"} mt={"2"}>
      <Box>
        <Text size={"2"}>
          Showing page {currentPage} of {totalPage}
        </Text>
      </Box>
      <Flex align={"center"} gap={"2"}>
        <Button
          color="gray"
          variant="soft"
          onClick={() => onChangePage(1)}
          disabled={currentPage === 1}
        >
          <DoubleArrowLeftIcon />
        </Button>
        <Button
          color="gray"
          variant="soft"
          onClick={() => onChangePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          color="gray"
          variant="soft"
          onClick={() => onChangePage(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          <ChevronRightIcon />
        </Button>
        <Button
          color="gray"
          variant="soft"
          onClick={() => onChangePage(totalPage)}
          disabled={currentPage === totalPage}
        >
          <DoubleArrowRightIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Pagination;

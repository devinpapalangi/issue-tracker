"use client";

import { Avatar, Flex, Select, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import prisma from "../../../../prisma/client";
import axios from "axios";
import { Issue, User } from "@prisma/client";
import useUsers from "@/app/hooks/useUsers";
import { Skeleton } from "@/components";
import toast from "react-hot-toast";

interface Props {
  issue: Issue;
}

const AssigneeSelect = async ({ issue }: Props) => {
  const { data: users, error, isLoading } = useUsers();

  if (error) return null;

  if (isLoading) return <Skeleton height="2rem" />;

  const onAssigneeChange = async (userId: string) => {
    try {
      const body = { assigneeId: userId || null };
      await axios.patch(`/xapi/issues/${issue.id}`, body);
    } catch (error) {
      toast.error("Failed to assign issue");
    }
  };

  return (
    <Select.Root
      onValueChange={onAssigneeChange}
      defaultValue={issue.assigneeId || ""}
    >
      <Select.Trigger
        //@ts-ignore
        placeholder="Assign..."
      />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              <Flex align={"center"} gap={"2"}>
                <Avatar
                  src={user.image!}
                  size={"1"}
                  fallback="?"
                  radius="full"
                />
                <Text>{user.name}</Text>
              </Flex>
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;

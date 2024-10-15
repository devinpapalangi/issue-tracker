"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setisDeleting] = useState<boolean>(false);
  const onDelete = async () => {
    try {
      setisDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        setError(error.response?.data);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setisDeleting(false);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            Delete Issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? You cannot undone this
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={onDelete}>
                Okay
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={!!error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Oops!</AlertDialog.Title>
          <AlertDialog.Description>{error}</AlertDialog.Description>
          <Button color="gray" onClick={() => setError(null)} mt={"2"}>
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;

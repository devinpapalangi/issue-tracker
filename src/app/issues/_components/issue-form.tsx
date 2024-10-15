"use client";

import { createIssueSchema } from "@/app/api/issues/_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import axios, { isAxiosError } from "axios";
import delay from "delay";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CreateIssueForm } from "../new/_types";
import { CREATE_ISSUE_DEFAULT_VALUES } from "../new/_constant";
import { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";

interface Props {
  issue?: Issue;
}

const IssueForm = async ({ issue }: Props) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateIssueForm>({
    defaultValues: issue ? issue : CREATE_ISSUE_DEFAULT_VALUES,
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = async (data: CreateIssueForm) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues");
      router.refresh();
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        setError(error.response?.data);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  await delay(2000);

  return (
    <>
      <form
        className="flex flex-col max-w-xl space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField.Root>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField.Input placeholder="Title" {...field} />
            )}
          />
        </TextField.Root>
        {errors.title?.message && (
          <Text color="crimson">{errors.title?.message}</Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description?.message && (
          <Text color="crimson">{errors.description?.message}</Text>
        )}
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Create New Issue"}
        </Button>
      </form>
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    </>
  );
};

export default IssueForm;

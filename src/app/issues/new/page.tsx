"use client";

import { Button, TextField, Text, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CreateIssueForm } from "./_types";
import { CREATE_ISSUE_DEFAULT_VALUES } from "./_constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/api/issues/_schemas";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateIssueForm>({
    defaultValues: CREATE_ISSUE_DEFAULT_VALUES,
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = async (data: CreateIssueForm) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        setError(error.response?.data);
      }
    }
  };

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
        <Button>Submit</Button>
      </form>
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    </>
  );
};

export default NewIssuePage;

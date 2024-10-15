import React from "react";
import { IssueFormLoader } from "../../_components";
import { notFound } from "next/navigation";
import prisma from "../../../../../prisma/client";
import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("../../_components/issue-form"), {
  ssr: false,
  loading: () => <IssueFormLoader />,
});

interface Props {
  params: {
    id: string;
  };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;

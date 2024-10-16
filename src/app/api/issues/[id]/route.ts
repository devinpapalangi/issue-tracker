import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema, pathIssueSchema } from "../_schemas";
import prisma from "../../../../../prisma/client";
import authOptions from "@/auth/auth-options";
import { getServerSession } from "next-auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();

  const validation = pathIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  const { assigneeId, title, description } = body;
  if (assigneeId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assigneeId,
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Assignee not found" },
        { status: 400 }
      );
    }
  }
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title,
      description,
      assigneeId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });

  return NextResponse.json("Issue deleted!", { status: 200 });
}

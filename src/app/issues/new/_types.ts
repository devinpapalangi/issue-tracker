import { createIssueSchema } from "@/app/api/issues/_schemas";
import { z } from "zod";

export type CreateIssueForm = z.infer<typeof createIssueSchema>;

import {
  DEFAULT_MAX_CHAR,
  emptyMessage,
  exceedMaxCharMessage,
  receedMinCharMessage,
} from "@/utils/validations";
import { z } from "zod";

export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, emptyMessage("Title"))
    .max(DEFAULT_MAX_CHAR, exceedMaxCharMessage("Title")),
  description: z
    .string()
    .min(1, emptyMessage("Description"))
    .max(65535, exceedMaxCharMessage("Description")),
});

export const pathIssueSchema = z.object({
  title: z
    .string()
    .min(1, emptyMessage("Title"))
    .max(65535, exceedMaxCharMessage("Title"))
    .optional(),
  description: z.string().min(1, emptyMessage("Description")).optional(),
  assigneeId: z
    .string()
    .min(1, emptyMessage("Assignee"))
    .max(DEFAULT_MAX_CHAR)
    .optional()
    .nullable(),
});

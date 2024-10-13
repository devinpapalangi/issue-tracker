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
  description: z.string().min(1, emptyMessage("Description")),
});

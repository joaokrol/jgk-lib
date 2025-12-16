import z from "zod";
import { msgs } from "./messages";

export const selectValidations = {
  select: z.string().min(1, msgs.required),
  multiselect: z.array(z.string()).min(1, msgs.required),
  tagselect: z.array(z.string()).min(1, msgs.required),
};

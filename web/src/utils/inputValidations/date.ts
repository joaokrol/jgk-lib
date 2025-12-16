import z from "zod";
import { DateFieldTypes } from "@components/inputs/types";
import { msgs } from "./messages";
import { isValidDate, isValidDateRange } from "./helpers";

export function dateValidations(type: DateFieldTypes) {
  if (type.endsWith("range")) {
    return z
      .array(z.string())
      .length(2, "Selecione início e fim")
      .refine((v) => isValidDateRange(v, type), {
        message: msgs.dateInvalid,
      });
  }

  return z
    .string()
    .min(1, msgs.required)
    .refine((v) => isValidDate(v, type), {
      message: msgs.dateInvalid,
    });
}

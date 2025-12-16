import z from "zod";
import { textValidations } from "./text";
import { dateValidations } from "./date";
import { selectValidations } from "./select";
import { booleanValidation } from "./boolean";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getValidation(type: string, args?: any): z.ZodTypeAny {
  if (type in selectValidations) {
    return selectValidations[type as keyof typeof selectValidations];
  }

  if (
    [
      "date",
      "datetime",
      "month",
      "year",
      "week",
      "daterange",
      "datetimerange",
      "timerange",
    ].includes(type)
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return dateValidations(type as any);
  }

  if (["checkbox", "switch", "toggle", "accept"].includes(type)) {
    return booleanValidation(args?.accept);
  }

  const textMap = textValidations(args);
  if (type in textMap) {
    return textMap[type as keyof typeof textMap];
  }

  return z.any();
}

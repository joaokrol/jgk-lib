import z from "zod";

export function booleanValidation(accept?: boolean) {
  return accept
    ? z.literal(true, {
        message: "Esse campo é obrigatório.",
      })
    : z.boolean();
}

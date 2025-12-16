import { MaskFn, MaskFieldTypes } from "./types";
import { onlyDigits, formatCurrency } from "./helpers";

export const masks: Record<MaskFieldTypes, MaskFn> = {
  cpf(value) {
    return onlyDigits(value, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  },

  cnpj(value) {
    return onlyDigits(value, 14)
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  },

  cpfcnpj(value) {
    const digits = onlyDigits(value, 14);

    return digits.length <= 11 ? masks.cpf(digits) : masks.cnpj(digits);
  },

  phone(value) {
    const digits = onlyDigits(value, 11);

    return digits.length <= 10
      ? digits
          .replace(/^(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4})(\d)/, "$1-$2")
      : digits
          .replace(/^(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{5})(\d)/, "$1-$2");
  },

  cep(value) {
    return onlyDigits(value, 8).replace(/^(\d{5})(\d)/, "$1-$2");
  },

  percent(value, ctx) {
    const digits = onlyDigits(value, ctx?.noLimited ? undefined : 5);

    if (!digits) return "";

    return formatCurrency(Number(digits) / 100);
  },

  currency(value) {
    const digits = onlyDigits(value);

    if (!digits) return "";

    return formatCurrency(Number(digits) / 100);
  },

  username(value, ctx) {
    return value.replace(/[^a-zA-Z0-9_]/g, "").slice(0, ctx?.max ?? 30);
  },
};

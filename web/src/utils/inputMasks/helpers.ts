export function onlyDigits(value: string, max?: number) {
  const digits = value.replace(/\D/g, "");
  return max ? digits.slice(0, max) : digits;
}

export function formatCurrency(
  value: number,
  locale = "pt-BR",
  currency = "BRL"
) {
  return value
    .toLocaleString(locale, {
      style: "currency",
      currency,
    })
    .replace(/^R\$\s?/, "");
}

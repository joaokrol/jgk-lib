export const masks = {
  cpf(value: string) {
    return value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  },
  cnpj(value: string) {
    return value
      .replace(/\D/g, "")
      .slice(0, 14)
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  },
  cpfcnpj(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 14);

    if (digits.length <= 11) {
      // CPF: 000.000.000-00
      return digits
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    // CNPJ: 00.000.000/0000-00
    return digits
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  },
  phone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 10) {
      return digits
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  },
  cep(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    return digits.replace(/^(\d{5})(\d)/, "$1-$2");
  },
  percent(value: string, noLimitted?: boolean) {
    // AJUSTAR - Não estar formatando corretamente
    // let v = value.replace(/[^\d,]/g, "");
    // const parts = v.split(",");
    // if (parts.length > 2) {
    //   v = parts[0] + "," + parts.slice(1).join("");
    // }
    // if (parts[1]) {
    //   v = `${parts[0]},${parts[1].slice(0, 2)}`;
    // }
    // return v ? `${v}` : "";
    const digits = noLimitted
      ? value.replace(/\D/g, "")
      : value.replace(/\D/g, "").slice(0, 5);
    if (!digits) return "";
    const number = Number(digits) / 100;
    return number
      .toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
      .replace(/^R\$\s?/, "");
  },
  currency(value: string) {
    const digits = value.replace(/\D/g, "");

    if (!digits) return "";

    const number = Number(digits) / 100;

    return number
      .toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
      .replace(/^R\$\s?/, "");
  },
  username(value: string, max?: number) {
    return value.replace(/[^a-zA-Z0-9_]/g, "").slice(0, max ?? 30);
  },
};

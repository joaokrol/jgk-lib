import z from "zod";
import dayjs from "dayjs";
import {
  isValidCep,
  isValidCNPJ,
  isValidCPF,
  isValidCpfCnpj,
  isValidPercentage,
  isValidPhone,
  zPassword,
} from "./validators";
import { DateFieldTypes } from "@components/inputs/types";

const msgs = {
  campo_vazio: "Este campo não pode ser vazio",
  email_invalido: "E-mail inválido",
  data_invalida: "Data inválida",
};

export function getValidation(
  inputType: DateFieldTypes,
  agrs?: {
    min?: number;
    min_msg?: string;
    justSize?: boolean;
    noLimitted?: boolean;
    multiple?: boolean;
  }
  //   optional: boolean,
  //   nullable: boolean
) {
  const textValidations = {
    text: z.string().min(agrs?.min ?? 1, agrs?.min_msg ?? msgs.campo_vazio),
    email: z.email(msgs.email_invalido),
    password: zPassword(agrs),
  };

  const textFormattedValidations = {
    cpf: agrs?.justSize
      ? z
          .string()
          .transform((v) => v.replace(/\D/g, ""))
          .refine((v) => v.length === 11, "CPF inválido")
      : z
          .string()
          .transform((v) => v.replace(/\D/g, ""))
          .refine(isValidCPF, {
            message: "CPF inválido",
          }),
    cnpj: agrs?.justSize
      ? z
          .string()
          .transform((v) => v.replace(/\D/g, ""))
          .refine((v) => v.length === 14, "CNPJ inválido")
      : z
          .string()
          .transform((v) => v.replace(/\D/g, ""))
          .refine(isValidCNPJ, {
            message: "CNPJ inválido",
          }),
    cpfcnpj: agrs?.justSize
      ? z
          .string()
          .transform((v) => v.replace(/\D/g, ""))
          .refine(
            (v) => v.length === 11 || v.length === 14,
            "CPF ou CNPJ inválido"
          )
      : z
          .string()
          .transform((v) => v.replace(/\D/g, ""))
          .refine(isValidCpfCnpj, {
            message: "CPF ou CNPJ inválido",
          }),
    phone: z
      .string()
      .transform((v) => v.replace(/\D/g, ""))
      .refine(isValidPhone, {
        message: "Telefone inválido",
      }),
    cep: z
      .string()
      .transform((v) => v.replace(/\D/g, ""))
      .refine(isValidCep, {
        message: "CEP inválido",
      }),
    percent: z.preprocess(
      (v) => {
        if (typeof v !== "string") return 0;

        const normalized = v.replace("%", "").replace(",", ".");

        const num = Number(normalized);
        return isNaN(num) ? 0 : num;
      },
      agrs?.noLimitted
        ? z.number()
        : z.number().refine(isValidPercentage, {
            message: "Porcentagem deve estar entre 0 e 100",
          })
    ),
    currency: z.preprocess((v) => {
      if (typeof v !== "string") return 0;

      // remove tudo exceto números
      const digits = v.replace(/\D/g, "");
      const number = Number(digits) / 100;

      return isNaN(number) ? 0 : number;
    }, z.number().min(0, "Valor não pode ser negativo")),
  };

  const numberValidations = {
    // INCLUIR - validação dos NumberField
  };

  const formats: Record<DateFieldTypes, string> = {
    date: "DD/MM/YYYY",
    month: "MM/YYYY",
    year: "YYYY",
    quarter: "[Q]Q/YYYY",
    week: "MM/DD",
    datetime: "DD/MM/YYYY HH:mm:ss",
    time: "HH:mm:ss",
    hour: "HH",
    minute: "mm",
    second: "ss",
    daterange: "DD/MM/YYYY",
    datetimerange: "DD/MM/YYYY HH:mm:ss",
    timerange: "HH:mm:ss",
  };

  const isValidDate = (v: string | string[], type: DateFieldTypes): boolean => {
    if (typeof v === "object") {
      return v.every((dateStr) => isValidDate(dateStr, type));
    }
    return !v ? true : dayjs(v, formats[type], true).isValid();
  };

  const isValidDateRange = (v: string[], type: DateFieldTypes) => {
    const DATE_FORMAT = formats[type];

    const [startStr, endStr] = v;
    const startDate = dayjs(startStr, DATE_FORMAT, true);
    const endDate = dayjs(endStr, DATE_FORMAT, true);

    if (!startDate.isValid() || !endDate.isValid()) {
      return false;
    }

    if (startDate.isAfter(endDate)) {
      return false;
    }
    return true;
  };

  const dateValidations = {
    date: (agrs?.multiple
      ? z.string()
      : z.array(z.string(), {
          message: "É necessário selecionar um intervalo de datas.",
        })
    )
      .min(1, msgs.campo_vazio)
      .refine((v) => isValidDate(v, "date"), {
        message: msgs.data_invalida,
      }),
    datetime: (agrs?.multiple
      ? z.string()
      : z.array(z.string(), {
          message: "É necessário selecionar um intervalo de datas.",
        })
    )
      .min(1, msgs.campo_vazio)
      .refine((v) => isValidDate(v, "datetime"), {
        message: msgs.data_invalida,
      }),
    month: (agrs?.multiple
      ? z.string()
      : z.array(z.string(), {
          message: "É necessário selecionar um intervalo de datas.",
        })
    )
      .min(1, msgs.campo_vazio)
      .refine((v) => isValidDate(v, "month"), {
        message: msgs.data_invalida,
      }),
    year: (agrs?.multiple
      ? z.string()
      : z.array(z.string(), {
          message: "É necessário selecionar um intervalo de datas.",
        })
    )
      .min(1, msgs.campo_vazio)
      .refine((v) => isValidDate(v, "year"), {
        message: msgs.data_invalida,
      }),
    week: (agrs?.multiple
      ? z.string()
      : z.array(z.string(), {
          message: "É necessário selecionar um intervalo de datas.",
        })
    )
      .min(1, msgs.campo_vazio)
      .refine((v) => isValidDate(v, "week"), {
        message: msgs.data_invalida,
      }),
    quarter: (agrs?.multiple
      ? z.string()
      : z.array(z.string(), {
          message: "É necessário selecionar um intervalo de datas.",
        })
    )
      .min(1, msgs.campo_vazio)
      .refine((v) => isValidDate(v, "quarter"), {
        message: msgs.data_invalida,
      }),
    time: (agrs?.multiple
      ? z.string()
      : z.array(z.string(), {
          message: "É necessário selecionar um intervalo de datas.",
        })
    )
      .min(1, msgs.campo_vazio)
      .refine((v) => isValidDate(v, "time"), {
        message: msgs.data_invalida,
      }),
    hour: (agrs?.multiple
      ? z.string()
      : z.array(z.string(), {
          message: "É necessário selecionar um intervalo de datas.",
        })
    )
      .min(1, msgs.campo_vazio)
      .refine((v) => isValidDate(v, "hour"), {
        message: msgs.data_invalida,
      }),
    minute: (agrs?.multiple
      ? z.string()
      : z.array(z.string(), {
          message: "É necessário selecionar um intervalo de datas.",
        })
    )
      .min(1, msgs.campo_vazio)
      .refine((v) => isValidDate(v, "minute"), {
        message: msgs.data_invalida,
      }),
    second: (agrs?.multiple
      ? z.string()
      : z.array(z.string(), {
          message: "É necessário selecionar um intervalo de datas.",
        })
    )
      .min(1, msgs.campo_vazio)
      .refine((v) => isValidDate(v, "second"), {
        message: msgs.data_invalida,
      }),
    daterange: z
      .array(z.string(), {
        message: "É necessário selecionar um intervalo de datas.",
      })
      .min(2, { message: "Selecione a data de início e a data de fim." })
      .max(2, { message: "Selecione apenas a data de início e a data de fim." })
      .refine((v) => isValidDateRange(v, "daterange"), {
        message: msgs.data_invalida,
      }),
    datetimerange: z
      .array(z.string(), {
        message: "É necessário selecionar um intervalo de datas.",
      })
      .min(2, { message: "Selecione a data de início e a data de fim." })
      .max(2, { message: "Selecione apenas a data de início e a data de fim." })
      .refine((v) => isValidDateRange(v, "datetimerange"), {
        message: msgs.data_invalida,
      }),
    timerange: z
      .array(z.string(), {
        message: "É necessário selecionar um intervalo de datas.",
      })
      .min(2, { message: "Selecione a data de início e a data de fim." })
      .max(2, { message: "Selecione apenas a data de início e a data de fim." })
      .refine((v) => isValidDateRange(v, "timerange"), {
        message: msgs.data_invalida,
      }),
  };

  const validations: Record<DateFieldTypes, z.ZodTypeAny> = {
    ...textValidations,
    ...textFormattedValidations,
    ...numberValidations,
    ...dateValidations,
  };

  if (inputType in validations) {
    return validations[inputType];
  }

  //   if (optional) {
  //     return valid.optional();
  //   }

  //   if (nullable) {
  //     return valid.nullable();
  //   }

  return z.string();
}

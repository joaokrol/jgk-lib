import z from "zod";
import {
  isValidCPF,
  isValidCNPJ,
  isValidCpfCnpj,
  isValidPhone,
  isValidCep,
  isValidPercentage,
  zPassword,
} from "./validators";
import { msgs } from "./messages";

export function textValidations(args?: {
  min?: number;
  minMsg?: string;
  justSize?: boolean;
  noLimited?: boolean;
}) {
  return {
    text: z.string().min(args?.min ?? 1, args?.minMsg ?? msgs.required),
    email: z.string().email(msgs.emailInvalid),
    password: zPassword(args),

    cpf: z
      .string()
      .transform((v) => v.replace(/\D/g, ""))
      .refine(
        args?.justSize ? (v) => v.length === 11 : isValidCPF,
        "CPF inválido"
      ),

    cnpj: z
      .string()
      .transform((v) => v.replace(/\D/g, ""))
      .refine(
        args?.justSize ? (v) => v.length === 14 : isValidCNPJ,
        "CNPJ inválido"
      ),

    cpfcnpj: z
      .string()
      .transform((v) => v.replace(/\D/g, ""))
      .refine(
        args?.justSize
          ? (v) => v.length === 11 || v.length === 14
          : isValidCpfCnpj,
        "CPF ou CNPJ inválido"
      ),

    phone: z
      .string()
      .transform((v) => v.replace(/\D/g, ""))
      .refine(isValidPhone, "Telefone inválido"),

    cep: z
      .string()
      .transform((v) => v.replace(/\D/g, ""))
      .refine(isValidCep, "CEP inválido"),

    percent: z.preprocess(
      (v) => Number(String(v).replace(",", ".")),
      args?.noLimited ? z.number() : z.number().refine(isValidPercentage)
    ),

    currency: z.preprocess(
      (v) => Number(String(v).replace(/\D/g, "")) / 100,
      z.number().min(0)
    ),

    username: z.string().min(1, msgs.required),
  };
}

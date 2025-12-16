import z from "zod";

export const zEmail = (optional = false) =>
  optional ? z.string().optional() : z.string().email("E-mail inválido");

export const zPassword = (opts?: {
  min?: number;
  requireNumber?: boolean;
  requireUpper?: boolean;
  requireLower?: boolean;
  requireSymbol?: boolean;
}) => {
  const {
    min = 8,
    requireNumber = false,
    requireUpper = false,
    requireLower = false,
    requireSymbol = false,
  } = opts || {};
  return z
    .string()
    .min(min, `Mínimo ${min} caracteres`)
    .refine((v) => (requireNumber ? /\d/.test(v) : true), {
      message: "Deve conter número",
    })
    .refine((v) => (requireUpper ? /[A-Z]/.test(v) : true), {
      message: "Deve conter letra maiúscula",
    })
    .refine((v) => (requireLower ? /[a-z]/.test(v) : true), {
      message: "Deve conter letra minúscula",
    })
    .refine(
      (v) => (requireSymbol ? /[!@#$%^&*()[\]{};:,.?~_\-+=]/.test(v) : true),
      { message: "Deve conter símbolo" }
    );
};

export function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, "");

  if (digits.length !== 11) return false;
  if (/^(\d)\1+$/.test(digits)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += Number(digits[i]) * (10 - i);
  }

  let firstCheck = (sum * 10) % 11;
  if (firstCheck === 10) firstCheck = 0;
  if (firstCheck !== Number(digits[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += Number(digits[i]) * (11 - i);
  }

  let secondCheck = (sum * 10) % 11;
  if (secondCheck === 10) secondCheck = 0;

  return secondCheck === Number(digits[10]);
}

export function isValidCNPJ(cnpj: string): boolean {
  const digits = cnpj.replace(/\D/g, "");

  if (digits.length !== 14) return false;
  if (/^(\d)\1+$/.test(digits)) return false;

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const calcCheckDigit = (base: string, weights: number[]) => {
    const sum = base
      .split("")
      .reduce((acc, digit, i) => acc + Number(digit) * weights[i], 0);

    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };

  const base = digits.slice(0, 12);
  const firstCheck = calcCheckDigit(base, weights1);
  const secondCheck = calcCheckDigit(base + firstCheck, weights2);

  return (
    firstCheck === Number(digits[12]) && secondCheck === Number(digits[13])
  );
}

export function isValidCpfCnpj(value: string): boolean {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 11) return isValidCPF(digits);
  if (digits.length === 14) return isValidCNPJ(digits);

  return false;
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
}

export function isValidCep(value: string): boolean {
  const digits = value.replace(/\D/g, "");

  if (digits.length !== 8) return false;
  if (/^0{8}$/.test(digits)) return false;

  return true;
}

export function isValidPercentage(value: number): boolean {
  return value >= 0 && value <= 100;
}

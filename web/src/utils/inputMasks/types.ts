import { BaseFieldTypes } from "@components/inputs/types";
import { masks } from "./masks";

export type MaskFieldTypes =
  | "cpf"
  | "cnpj"
  | "cpfcnpj"
  | "phone"
  | "cep"
  | "percent"
  | "currency"
  | "username";

export type MaskContext = {
  max?: number;
  noLimited?: boolean;
};

export type MaskFn = (value: string, ctx?: MaskContext) => string;

export function hasMask(type: BaseFieldTypes): type is MaskFieldTypes {
  return type in masks;
}

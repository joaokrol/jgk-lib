import { Input } from "antd";
import { runes } from "runes2";
import type { TextFieldTypes } from "../types";

type TextFieldConfig = {
  component?: typeof Input | typeof Input.Password | typeof Input.Search;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>;
};

export const TEXT_FIELD_CONFIG: Record<TextFieldTypes, TextFieldConfig> = {
  text: {
    component: Input,
  },
  email: {
    component: Input,
    props: { type: "email" },
  },
  password: {
    component: Input.Password,
  },
  search: {
    component: Input.Search,
  },
  cep: {
    component: Input,
  },
  currency: {
    component: Input,
    props: { prefix: "R$" },
  },
  percent: {
    component: Input,
    props: { suffix: "%" },
  },
  username: {
    component: Input,
    props: {
      prefix: "@",
      count: {
        show: true,
        max: 30,
        strategy: (txt: string) => runes(txt).length,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        exceedFormatter: (txt: string, { max }: any) =>
          runes(txt).slice(0, max).join(""),
      },
    },
  },
  number: {
    component: Input,
    props: { type: "number" },
  },
  cpf: {
    component: Input,
  },
  cnpj: {
    component: Input,
  },
  cpfcnpj: {
    component: Input,
  },
  phone: {
    component: Input,
  },
};

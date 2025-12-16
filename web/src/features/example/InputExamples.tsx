import { Form } from "@components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { createExampleOption, fetchExampleOptions } from "./api";
import {
  CheckboxField,
  DateField,
  DateRangeField,
  MultiSelectField,
  NumberField,
  SelectField,
  SwitchField,
  TextField,
  ToggleField,
  ToggleSelectField,
} from "@components/inputs";
import { getValidation } from "@utils/inputValidations";

const options = [
  { label: "A", value: "a" },
  { label: "B", value: "b" },
  { label: "C", value: "c" },
  { label: "Z", value: "z" },
  { label: "D", value: "d" },
];

const fields = [
  // TEXT
  { name: "text", label: "Texto", type: "text", component: "text" },
  { name: "password", label: "Senha", type: "password", component: "text" },
  { name: "cpf", label: "CPF", type: "cpf", component: "text" },
  { name: "cnpj", label: "CNPJ", type: "cnpj", component: "text" },
  { name: "cpfcnpj", label: "CPF / CNPJ", type: "cpfcnpj", component: "text" },
  { name: "phone", label: "Telefone", type: "phone", component: "text" },
  { name: "cep", label: "CEP", type: "cep", component: "text" },
  { name: "percent", label: "Porcentagem", type: "percent", component: "text" },
  { name: "currency", label: "Moeda", type: "currency", component: "text" },
  { name: "username", label: "Usuário", type: "username", component: "text" },

  // NUMBER
  { name: "number", label: "Número", type: "number", component: "number" },

  // DATE
  { name: "date", label: "Data", type: "date", component: "date" },
  {
    name: "datetime",
    label: "Data e Hora",
    type: "datetime",
    component: "date",
  },

  // DATE RANGE
  {
    name: "daterange",
    label: "Intervalo de Datas",
    type: "daterange",
    component: "daterange",
  },

  // SELECT
  {
    name: "select",
    label: "Select",
    type: "select",
    component: "select",
    options,
  },
  {
    name: "multiselect",
    label: "MultiSelect",
    type: "multiselect",
    component: "multiselect",
    fetchOptions: fetchExampleOptions,
  },
  {
    name: "tagselect",
    label: "Tag Select",
    type: "tagselect",
    component: "multiselect",
    fetchOptions: fetchExampleOptions,
    onCreate: createExampleOption,
  },

  // BOOLEAN
  { name: "switch", label: "Switch", type: "switch", component: "boolean" },
  {
    name: "checkbox",
    label: "Checkbox",
    type: "checkbox",
    component: "boolean",
  },
  { name: "toggle", label: "Toggle", type: "toggle", component: "boolean" },
  {
    name: "toggleselect",
    label: "ToggleSelect",
    type: "toggleselect",
    component: "boolean",
  },
] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultValues = fields.reduce<Record<string, any>>((acc, field) => {
  switch (field.component) {
    case "multiselect":
    case "daterange":
      acc[field.name] = [];
      break;
    case "boolean":
      acc[field.name] = false;
      break;
    default:
      acc[field.name] = "";
  }
  return acc;
}, {});

const schema = z.object(
  fields.reduce<Record<string, z.ZodTypeAny>>((acc, field) => {
    acc[field.name] = getValidation(field.type, {
      accept: field.component === "boolean",
    });
    return acc;
  }, {})
);

function RenderField({ field }: { field: (typeof fields)[number] }) {
  switch (field.component) {
    case "text":
      return <TextField required {...field} />;

    case "number":
      return <NumberField required {...field} />;

    case "date":
      return <DateField required {...field} />;

    case "daterange":
      return <DateRangeField required {...field} />;

    case "select":
      return <SelectField required sortFilter {...field} />;

    case "multiselect":
      return <MultiSelectField required {...field} />;

    case "boolean":
      if (field.type === "switch") return <SwitchField required {...field} />;
      if (field.type === "checkbox")
        return <CheckboxField required {...field} />;
      if (field.type === "toggle") return <ToggleField required {...field} />;
      return <ToggleSelectField required {...field} />;

    default:
      return null;
  }
}

export default function InputExamples() {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  return (
    <Form
      methods={methods}
      onSubmit={(data) => {
        console.log("SUBMIT:", data);
      }}
    >
      {fields.map((field) => (
        <RenderField key={field.name} field={field} />
      ))}

      <button type="button" onClick={() => console.log(methods.getValues())}>
        Console.log
      </button>
      <button type="submit">Submit</button>
    </Form>
  );
}

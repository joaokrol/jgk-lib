import { Form } from "@components/form";
import { DateField } from "@components/inputs/date/DateField";
import { NumberField } from "@components/inputs/number/NumberField";
import { TextField } from "@components/inputs/text/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidation } from "@utils/inputValidations";
import { useForm } from "react-hook-form";
import z from "zod";

const fields_text = [
  // {
  //   name: "text",
  //   label: "Texto",
  //   type: "text",
  // },
  // {
  //   name: "password",
  //   label: "Senha",
  //   type: "password",
  // },
  // {
  //   name: "cpf",
  //   label: "CPF",
  //   type: "cpf",
  // },
  // {
  //   name: "cnpj",
  //   label: "CNPJ",
  //   type: "cnpj",
  // },
  // {
  //   name: "cpfcnpj",
  //   label: "CPFCNPJ",
  //   type: "cpfcnpj",
  // },
  // {
  //   name: "phone",
  //   label: "Telefone",
  //   type: "phone",
  // },
  // {
  //   name: "cep",
  //   label: "CEP",
  //   type: "cep",
  // },
  // {
  //   name: "percent",
  //   label: "Porcentagem",
  //   type: "percent",
  // },
  // {
  //   name: "currency",
  //   label: "Moeda",
  //   type: "currency",
  // },
  // {
  //   name: "username",
  //   label: "Nome de Usuario",
  //   type: "username",
  // },
  // {
  //   name: "number",
  //   label: "Número",
  //   type: "number",
  // },
] as const;

const fields_number = [
  // { name: "number", label: "Número", type: "number" },
  // { name: "stepper", label: "Stepper", type: "stepper" },
  // { name: "num_currency", label: "Moeda", type: "num_currency" },
  // { name: "num_percent", label: "Porcentagem", type: "num_percent" },
] as const;

const fields_date = [
  // { name: "date", label: "Data", type: "date" },
  // { name: "month", label: "Mês", type: "month" },
  // { name: "year", label: "Ano", type: "year" },
  // { name: "quarter", label: "Trimestre", type: "quarter" },
  // { name: "week", label: "Semana", type: "week" },
  // { name: "datetime", label: "Data e Hora", type: "datetime" },
  // { name: "time", label: "Hora", type: "time" },
  // { name: "hour", label: "Hora (apenas hora)", type: "hour" },
  // { name: "minute", label: "Minuto", type: "minute" },
  // { name: "second", label: "Segundo", type: "second" },
  // { name: "daterange", label: "Intervalo de Datas", type: "daterange" },
  // {
  //   name: "datetimerange",
  //   label: "Intervalo de Data e Hora",
  //   type: "datetimerange",
  // },
  // { name: "timerange", label: "Intervalo de Horas", type: "timerange" },
] as const;

const fields = [...fields_text, ...fields_number, ...fields_date];

const schema = z.object(
  fields.reduce<Record<string, unknown>>((acc, item) => {
    acc[item.name] = getValidation(item.type, { justSize: true });
    return acc;
  }, {})
);

type ExempleForm = z.infer<typeof schema>;

export default function InputExamples() {
  const defaultValues = fields.reduce<Record<string, string>>((acc, item) => {
    acc[item.name] = "";
    return acc;
  }, {});

  const methods = useForm<ExempleForm>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
    mode: "onBlur",
  });

  const handleConsole = () => {
    console.log(methods.formState.errors);
    console.log(methods.getValues());
  };
  return (
    <Form
      methods={methods}
      onSubmit={(data) => {
        console.log(data);
      }}
    >
      {/* {fields_text.map((item) => (
        <TextField required {...item} />
      ))} */}
      {/* {fields_number.map((item) => (
        <NumberField {...item} />
      ))} */}
      {/* {fields_date.map((item) => (
        <DateField required multiple {...item} />
      ))} */}
      <button onClick={handleConsole}>Console.log</button>
      <button type="submit">Submit</button>
    </Form>
  );
}

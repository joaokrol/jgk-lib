type userType = "operador" | "gestor";
type sheetType = "production";
type sheetPermissionsType = {
  read: userType[];
  write: userType[];
};

export type SheetValueType = "text" | "number" | "date" | "object" | "array";

type sheetRenderInputType =
  | "TextField"
  | "DateField"
  | "NumberField"
  | "SelectField";

type sheetTypeInputType =
  | "text"
  | "int"
  | "float"
  | "date"
  | "currency"
  | "teaxarea";

export type SheetRenderColumnType = "int" | "text" | "select" | "textarea" | "date";

type columnOptionsTypes = {
  fixed?: "left" | "right";
  editable?: boolean;
  allowHide?: boolean;
  allowResize?: boolean;
  allowMove?: boolean;
  defaultVisible?: boolean;
  defaultWidth?: number;
  defaultOrder?: number;
};

type formOptionsRulesTypes = {
  max: string;
};
// type formCustomRulesTypes = {};
// type formTriggersTypes = {};

type formOptionsTypes = {
  required?: boolean;
  colSpan?: number;
  mask?: string;
  placeholder?: string;
  rules?: formOptionsRulesTypes;
  customRules?: string[];
  triggers?: string[];
};

export type OptionsType = {
  value: string;
  label: string;
};

export type OptionsSourceTypes = {
  collection: string;
  document: string;
  labelField: string;
  valueField: string;
};

export interface SheetColumnTypes {
  key: string;
  title?: string;
  title_re?: string;
  valueType?: SheetValueType;
  renderInput?: sheetRenderInputType;
  typeInput?: sheetTypeInputType;
  renderColumn?: SheetRenderColumnType;
  columnsOptions?: columnOptionsTypes;
  formOptions?: formOptionsTypes;
  options?: OptionsType[];
  optionsSource?: OptionsSourceTypes;
  children: SheetColumnTypes[];
}

export interface SheetDataTypes {
  id: string;
  data: Date;
  lote: string;
  tipo_farinha?: string;
  quantidade_etiquetas?: number;
  numeracao_etiquetas_inicial?: number;
  numeracao_etiquetas_final?: number;
  etiquetas_nao_utilizadas?: number;
  etiquetas_utilizadas?: number;
  observacao?: string;
}

export interface SheetDefTypes {
  key: string;
  title?: string;
  label?: string;
  type?: sheetType;
  permissions?: sheetPermissionsType;
  columnsSchema?: SheetColumnTypes[];
}

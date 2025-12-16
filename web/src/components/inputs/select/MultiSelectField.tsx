import { Button, Divider, Select } from "antd";
import { BaseField } from "../base/BaseField";
import { useSelectOptions, OptionType } from "./hooks/useSelectOptions";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

export interface MultiSelectFieldProps<T> {
  name?: string;
  value?: T[];
  onChange?: (v: T[]) => void;

  label?: string;
  required?: boolean;
  helpText?: string;
  placeholder?: string;

  options?: OptionType<T>[];
  fetchOptions?: (search: string) => Promise<OptionType<T>[]>;

  allowClear?: boolean;
  showSearch?: boolean;
  disabled?: boolean;
  maxCount?: number;
  sortFilter?: boolean;

  onCreate?: (
    label: string
  ) => Promise<OptionType<T> | void> | OptionType<T> | void;
  createLabel?: string;
}

export default function MultiSelectField<T>({
  options,
  fetchOptions,
  allowClear = true,
  showSearch = true,
  sortFilter,
  maxCount,
  onCreate,
  createLabel = "Criar",
  ...rest
}: MultiSelectFieldProps<T>) {
  const {
    options: asyncOptions,
    loading,
    onSearch,
    addOption,
  } = useSelectOptions<T>({ options, fetchOptions });

  const [searchValue, setSearchValue] = useState("");

  async function handleCreate() {
    if (!onCreate || !searchValue) return;

    const result = await onCreate(searchValue);

    if (result && typeof result === "object" && "value" in result) {
      addOption(result);
    }
  }
  function Input(val: T[], setVal: (v: T[]) => void) {
    return (
      <Select
        mode="multiple"
        value={val}
        options={asyncOptions}
        loading={loading}
        onChange={setVal}
        allowClear={allowClear}
        disabled={rest.disabled}
        placeholder={rest.placeholder}
        maxCount={maxCount}
        style={{ width: "100%" }}
        showSearch={
          showSearch
            ? false
            : {
                filterOption: fetchOptions
                  ? false
                  : (input, option) =>
                      (option?.label ?? "")
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase()),
                onSearch: (value) => {
                  setSearchValue(value);
                  onSearch?.(value);
                },
                filterSort: sortFilter
                  ? (optionA, optionB) =>
                      `${optionA?.label ?? ""}`
                        .toLowerCase()
                        .localeCompare(`${optionB?.label ?? ""}`.toLowerCase())
                  : undefined,
                autoClearSearchValue: allowClear,
              }
        }
        popupRender={(menu) =>
          onCreate ? (
            <>
              {menu}
              <Divider style={{ margin: "8px 0" }} />
              <div style={{ padding: "0 8px" }}>
                <Button
                  type="text"
                  block
                  icon={<PlusOutlined />}
                  onClick={handleCreate}
                  disabled={!searchValue}
                  style={{ textAlign: "left" }}
                >
                  {searchValue
                    ? `${createLabel} "${searchValue}"`
                    : "Criar novo"}
                </Button>
              </div>
            </>
          ) : (
            menu
          )
        }
      />
    );
  }

  return <BaseField<T[]> render={Input} type="multiselect" {...rest} />;
}

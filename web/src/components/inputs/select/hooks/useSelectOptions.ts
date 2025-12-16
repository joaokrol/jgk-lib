import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";

export interface OptionType<T> {
  label: React.ReactNode;
  value: T;
  disabled?: boolean;
}

interface UseSelectOptionsProps<T> {
  options?: OptionType<T>[];
  fetchOptions?: (search: string) => Promise<OptionType<T>[]>;
  debounceTimeout?: number;
  minSearchLength?: number;
  autoLoad?: boolean;
}

export function useSelectOptions<T>({
  options = [],
  fetchOptions,
  debounceTimeout = 800,
  minSearchLength = 0,
  autoLoad = true,
}: UseSelectOptionsProps<T>) {
  const [internalOptions, setInternalOptions] =
    useState<OptionType<T>[]>(options);
  const [loading, setLoading] = useState(false);

  const fetchRef = useRef(0);

  const executeSearch = useCallback(
    async (value: string) => {
      if (!fetchOptions) return;

      const cleanValue = value.trim();
      if (cleanValue.length < minSearchLength && cleanValue.length > 0) {
        setInternalOptions([]);
        return;
      }

      fetchRef.current += 1;
      const fetchId = fetchRef.current;

      setLoading(true);

      try {
        const newOptions = await fetchOptions(cleanValue);
        if (fetchId === fetchRef.current) {
          setInternalOptions(newOptions);
        }
      } finally {
        if (fetchId === fetchRef.current) {
          setLoading(false);
        }
      }
    },
    [fetchOptions, minSearchLength]
  );

  const debouncedSearch = useMemo(
    () => debounce(executeSearch, debounceTimeout),
    [executeSearch, debounceTimeout]
  );

  useEffect(() => {
    if (fetchOptions && autoLoad && minSearchLength === 0) {
      executeSearch("");
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [fetchOptions, autoLoad, minSearchLength, executeSearch, debouncedSearch]);

  const addOption = (option: OptionType<T>) => {
    setInternalOptions((prev) => {
      const exists = prev.some((o) => o.value === option.value);
      return exists ? prev : [...prev, option];
    });
  };

  return {
    options: internalOptions,
    loading,
    onSearch: fetchOptions ? debouncedSearch : undefined,
    addOption,
  };
}

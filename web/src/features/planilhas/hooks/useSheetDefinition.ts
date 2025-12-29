import { useQuery } from "@tanstack/react-query";
import { SheetDefTypes, SheetDataTypes } from "../types";
import { getSheetData, getSheetDefinition } from "../api/sheets";

export function useSheetDefinition(sheetId?: string) {
  return useQuery<SheetDefTypes>({
    queryKey: ["sheet-definition", sheetId],
    queryFn: () => {
      if (!sheetId) throw new Error("Sheet ID is required");
      return getSheetDefinition(sheetId);
    },
    enabled: !!sheetId,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
}

export function useSheetData(sheetId?: string) {
  return useQuery<SheetDataTypes[]>({
    queryKey: ["sheet-data", sheetId],
    queryFn: () => {
      if (!sheetId) throw new Error("Sheet ID is required");
      return getSheetData(sheetId);
    },
    enabled: !!sheetId,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
}

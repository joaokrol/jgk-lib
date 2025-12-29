import { useQuery } from "@tanstack/react-query";
import { getCatalog } from "../api/sheets";
import { OptionsType } from "../types";

export function useCatalog(catalogId?: string) {
  return useQuery<OptionsType[]>({
    queryKey: ["catalogs", catalogId],
    queryFn: () => {
      if (!catalogId) throw new Error("Sheet ID is required");
      return getCatalog(catalogId);
    },
    enabled: !!catalogId,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
}

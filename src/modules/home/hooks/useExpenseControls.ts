import { useState } from "react";
import type { UseExpenseControlsResult, SortValue  } from "../../../types/types";
import { sortOptions } from "../components/dashboard/constants/sortOptions";

const useExpenseControls = (): UseExpenseControlsResult => {

  const [search, setSearch] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<SortValue>("recent");

  const selectedSortOption = sortOptions.find(
    (option) => option.value === selectedSort
  );

  const selectedSortLabel = selectedSortOption?.label ?? "Most recent";

  const handleRestore = (): void => {
    setSelectedSort("recent");
  }

  return {
    search,
    setSearch,
    selectedSort,
    setSelectedSort,
    selectedSortOption,
    selectedSortLabel,
    handleRestore,
    sortOptions
  }
}

export default useExpenseControls;

import { useState } from "react";
import type { UseExpenseControlsResult, SortValue  } from "../../../types/types";
import { sortOptions } from "../components/dashboard/constants/sortOptions";

const useExpenseControls = (): UseExpenseControlsResult => {

  const [selectedSort, setSelectedSort] = useState<SortValue>("NEWEST");

  const selectedSortOption = sortOptions.find(
    (option) => option.value === selectedSort
  );

  const selectedSortLabel = selectedSortOption?.label ?? "Most recent";

  const handleRestore = (): void => {
    setSelectedSort("NEWEST");
  }

  return {
    selectedSort,
    setSelectedSort,
    selectedSortOption,
    selectedSortLabel,
    handleRestore,
    sortOptions
  }
}

export default useExpenseControls;

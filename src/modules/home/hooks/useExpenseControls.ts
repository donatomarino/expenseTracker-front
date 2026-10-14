import type { UseExpenseControlsResult } from "../../../types/types";
import { useSpendingContext } from "../../../context/SpendingContext";
import { sortOptions } from "../constants/sortOptions";

const useExpenseControls = (): UseExpenseControlsResult => {
  const { selectedSort, setSelectedSort } = useSpendingContext();

  const selectedSortOption = sortOptions.find(
    (option) => option.value === selectedSort
  );

  const selectedSortLabel = selectedSortOption?.label ?? "Most recent";

  return {
    selectedSort,
    setSelectedSort,
    selectedSortOption,
    selectedSortLabel,
    sortOptions,
  };
};

export default useExpenseControls;

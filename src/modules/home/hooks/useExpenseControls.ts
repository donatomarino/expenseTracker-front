import type { UseExpenseControlsResult } from "../../../types/types";
import { sortOptions } from "../components/dashboard/constants/sortOptions";
import { useSpendingContext } from "../../../context/SpendingContext";

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

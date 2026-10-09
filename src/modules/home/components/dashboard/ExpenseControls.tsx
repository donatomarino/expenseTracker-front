import "./css/expenseControls.css";
import useExpenseControls from "../../hooks/useExpenseControls";
import { useSpending } from "../../hooks/useSpending";
import { SearchInput } from "./expenseControls/searchInput";
import { SortDropdown } from "./expenseControls/SortDropdown";

const ExpenseControls = () => {
  const {
    selectedSort,
    setSelectedSort,
    selectedSortLabel,
  } = useExpenseControls();

  const { search, setSearch } = useSpending();

  return (
    <section
      className="expense-controls bg-white border rounded-4 shadow-sm p-3 p-md-4 mb-3"
      aria-label="Expense search and sorting controls"
    >
      <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between gap-3">
        {/* Search */}
        <SearchInput
          search={search}
          setSearch={setSearch}
        />

        {/* Sort */}
        <SortDropdown
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          selectedSortLabel={selectedSortLabel}
        />
      </div>
    </section>
  );
};

export default ExpenseControls;
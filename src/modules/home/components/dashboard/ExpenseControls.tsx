import Button from "../../../common/components/Button"
import "./css/expensecontrols.css";
import useExpenseControls from "../../hooks/useExpenseControls";

const ExpenseControls = () => {
  // Search + sort
  const { search, setSearch, selectedSort, setSelectedSort, selectedSortLabel, handleRestore, sortOptions } = useExpenseControls();

  return (
    <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between gap-3 p-3 bg-white border rounded-4 shadow-sm">
      <div className="search-wrapper ms-md-3">
        <label htmlFor="expense-search" className="visually-hidden">
          Search expenses
        </label>

        <input
          id="expense-search"
          className="form-control border-0 bg-light"
          type="search"
          placeholder="Search..."
          aria-label="Search expenses"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="dropdown flex-shrink-0 me-md-3">
        <Button
          id="sort-dropdown"
          className="dropdown-toggle px-3 text-nowrap"
          variant="outlinePrimary"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          Sort by: <span className="fw-semibold">{selectedSortLabel}</span>
        </Button>

        <div className="dropdown-menu dropdown-menu-end p-3 border-0 shadow rounded-4" aria-label="sort-dropdown" style={{ minWidth: "280px" }}>
          {sortOptions.map((option) => {
            const optionId = `sort-${option.value}`;

            return (
              <div className="form-check mb-2" key={option.value}>
                <input
                  id={optionId}
                  className="form-check-input"
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={selectedSort === option.value}
                  onChange={(e) => setSelectedSort(e.target.value)}
                />

                <label
                  className="form-check-label"
                  htmlFor={optionId}
                >
                  {option.label}
                </label>
              </div>
            )
          })}

          <Button
            className="w-100 fw-semibold mt-3"
            variant="primary"
          // onClick={filterByAmount}
          >
            Search
          </Button>

          <Button
            className="border w-100 mt-2"
            variant="light"
            onClick={handleRestore}
          >
            Restore
          </Button>
        </div>

      </div>
    </div>
  )
}

export default ExpenseControls

import Button from "../../../common/components/Button";
import "./css/expensecontrols.css";
import useExpenseControls from "../../hooks/useExpenseControls";
import { useSpending } from "../../hooks/useSpending";

const ExpenseControls = () => {
  const {
    selectedSort,
    setSelectedSort,
    selectedSortLabel,
    handleRestore,
    sortOptions,
  } = useExpenseControls();

  const { search, setSearch } = useSpending();

  return (
    <section
      className="expense-controls bg-white border rounded-4 shadow-sm p-3 p-md-4 mb-3"
      aria-label="Expense search and sorting controls"
    >
      <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between gap-3">
        {/* Search */}
        <div className="expense-search">
          <label
            htmlFor="expense-search"
            className="visually-hidden"
          >
            Search expenses
          </label>

          <div className="input-group expense-search-group">
            <span className="input-group-text">
              <i className="bi bi-search" aria-hidden="true"></i>
            </span>

            <input
              id="expense-search"
              className="form-control"
              type="search"
              placeholder="Search expenses..."
              aria-label="Search expenses"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                type="button"
                className="btn btn-light expense-clear-button"
                aria-label="Clear search"
                onClick={() => setSearch("")}
              >
                <i className="bi bi-x-lg" aria-hidden="true"></i>
              </button>
            )}
          </div>
        </div>

        {/* Sort */}
        <div className="dropdown expense-sort">
          <Button
            id="sort-dropdown"
            className="dropdown-toggle w-100 px-3 text-nowrap"
            variant="outlinePrimary"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <i className="bi bi-filter me-2" aria-hidden="true"></i>
            <span className="text-muted">Sort by:</span>{" "}
            <span className="fw-semibold">{selectedSortLabel}</span>
          </Button>

          <div
            className="dropdown-menu dropdown-menu-end p-3 border-0 shadow rounded-4"
            aria-labelledby="sort-dropdown"
          >
            <div className="mb-3">
              <p className="mb-1 fw-semibold text-dark">
                Sort expenses
              </p>

              <small className="text-muted">
                Choose how to order your expenses
              </small>
            </div>

            <div className="sort-options">
              {sortOptions.map((option) => {
                const optionId = `sort-${option.value}`;

                return (
                  <div
                    className="form-check sort-option mb-2"
                    key={option.value}
                  >
                    <input
                      id={optionId}
                      className="form-check-input"
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={selectedSort === option.value}
                      onChange={(event) =>
                        setSelectedSort(event.target.value)
                      }
                    />

                    <label
                      className="form-check-label w-100"
                      htmlFor={optionId}
                    >
                      {option.label}
                    </label>
                  </div>
                );
              })}
            </div>

            <div className="dropdown-divider"></div>

            <div className="d-flex flex-column gap-2">
              <Button
                className="w-100 fw-semibold"
                variant="primary"
              >
                Apply sorting
              </Button>

              <Button
                className="w-100 border"
                variant="light"
                onClick={handleRestore}
              >
                Restore
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpenseControls;
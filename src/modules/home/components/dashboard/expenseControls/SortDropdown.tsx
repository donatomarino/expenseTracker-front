import type { SortDropdownProps } from "../../../../../types/types";
import Button from "../../../../common/components/Button";
import { sortOptions } from "../constants/sortOptions";

export const SortDropdown = ({ selectedSort, setSelectedSort, selectedSortLabel }: SortDropdownProps) => {
  return (
    <div className="dropdown dropdown-center expense-sort">
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
        className="dropdown-menu dropdown-menu-md-end p-3 border-0 shadow rounded-4"
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
      </div>
    </div>
  )
}
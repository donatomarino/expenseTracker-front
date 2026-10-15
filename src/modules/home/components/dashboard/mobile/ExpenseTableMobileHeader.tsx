import type { ExpenseTableMobileHeaderProps } from "../../../../../types/types";
import { PAGE_SIZE_OPTIONS } from "../../../constants/pageSizeOptions";

const ExpenseTableMobileHeader = ({
  totalElements,
  pageSize,
  handlePageSizeChange
}: ExpenseTableMobileHeaderProps) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h6 className="mb-1 fw-bold text-dark">Expenses</h6>
        <small className="text-muted">
          {totalElements} total {totalElements === 1 ? "expense" : "expenses"}
        </small>
      </div>

      <div style={{ width: "88px" }}>
        <select
          className="form-select form-select-sm rounded-3"
          value={pageSize}
          onChange={handlePageSizeChange}
          aria-label="Page size"
        >
          {PAGE_SIZE_OPTIONS.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ExpenseTableMobileHeader;
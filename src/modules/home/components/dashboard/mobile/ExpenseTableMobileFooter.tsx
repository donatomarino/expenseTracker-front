import type { ExpenseTableMobileFooterProps } from "../../../../../types/types";

const ExpenseTableMobileFooter = ({
  currentPage,
  totalPages,
  spendings,
  totalElements,
  changePage,
  first,
  last
}: ExpenseTableMobileFooterProps) => {
  return (
    <div className="px-3 pb-3 pt-2">
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body py-3 px-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <small className="text-muted">
              Page {currentPage} of {totalPages || 1}
            </small>
            <small className="text-muted">
              Showing {spendings.length} of {totalElements}
            </small>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm rounded-3 flex-fill"
              onClick={() => changePage(currentPage - 1)}
              disabled={first}
            >
              Prev
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary btn-sm rounded-3 flex-fill"
              onClick={() => changePage(currentPage + 1)}
              disabled={last}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseTableMobileFooter;
import type { PaginationProps } from "../../../../../types/types"
import Button from "../../../../common/components/Button"

export const Pagination = ({ changePage, currentPage, first, last, totalPages}: PaginationProps) => {
  return (
    <div className="mt-3 me-3">
      <nav aria-label="Expenses pagination">
        <ul className="pagination justify-content-end align-items-center">
          <li className="page-item">
            <Button
              type="button"
              variant="light"
              className="navigation-button rounded-circle d-flex align-items-center justify-content-center border"
              onClick={() =>
                changePage(currentPage - 1)
              }
              disabled={first}
              aria-label="Go to previous page"
            >
              <i
                className="bi bi-chevron-left"
                aria-hidden="true"
              />
            </Button>
          </li>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page
                ? "active"
                : ""
                }`}
            >
              <Button
                type="button"
                className="page-link rounded-circle px-3 py-2"
                onClick={() => changePage(page)}
                aria-current={
                  currentPage === page
                    ? "page"
                    : undefined
                }
              >
                {page}
              </Button>
            </li>
          ))}

          <li className="page-item">
            <Button
              type="button"
              variant="light"
              className="navigation-button rounded-circle d-flex align-items-center justify-content-center border"
              onClick={() =>
                changePage(currentPage + 1)
              }
              disabled={last}
              aria-label="Go to next page"
            >
              <i
                className="bi bi-chevron-right"
                aria-hidden="true"
              />
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
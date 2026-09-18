import { useMemo, useState } from "react";
import type { Expense } from "../../../../types/types";

const PAGE_SIZE_OPTIONS = [10, 15, 25] as const;

const ExpenseTable = () => {
  const expenses: Expense[] = [
    {
      id: 1,
      date: "2023-01-01",
      description: "Grocery shopping",
      paymentMethod: "Credit Card",
      amount: 100.0,
    },
    {
      id: 2,
      date: "2023-01-02",
      description: "Gas",
      paymentMethod: "Cash",
      amount: 50.0,
    },
    {
      id: 3,
      date: "2023-01-03",
      description: "Restaurant",
      paymentMethod: "Debit Card",
      amount: 75.0,
    },
        {
      id: 4,
      date: "2023-01-04",
      description: "Amazon",
      paymentMethod: "Transfer",
      amount: 75.0,
    }
  ];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  const getPaymentBadgeClass = (paymentMethod: string) => {
    switch (paymentMethod) {
      case "Credit Card":
        return "text-bg-primary";

      case "Debit Card":
        return "text-bg-info";

      case "Cash":
        return "text-bg-success";

      case "Transfer":
        return "text-bg-warning";

      default:
        return "text-bg-secondary";
    }
  };

  const totalPages = Math.ceil(expenses.length / pageSize);

  const visibleExpenses = useMemo(() => {
    const firstIndex = (currentPage - 1) * pageSize;
    const lastIndex = firstIndex + pageSize;

    return expenses.slice(firstIndex, lastIndex);
  }, [expenses, currentPage, pageSize]);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) =>
      Math.max(prevPage - 1, 1)
    );
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, totalPages)
    );
  };

  const handlePageSizeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" className="px-4 py-3 text-muted small">
                Date
              </th>

              <th scope="col" className="py-3 text-muted small">
                Description
              </th>

              <th scope="col" className="py-3 text-muted small">
                Payment method
              </th>

              <th scope="col" className="py-3 text-muted small text-end">
                Amount
              </th>

              <th
                scope="col"
                className="py-3 text-muted small text-center"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {visibleExpenses.map((expense) => (
              <tr key={expense.id}>
                <td className="px-4 text-nowrap text-muted">
                  {formatDate(expense.date)}
                </td>

                <td>
                  <span className="fw-semibold text-dark">
                    {expense.description}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge rounded-pill ${getPaymentBadgeClass(
                      expense.paymentMethod
                    )}`}
                  >
                    {expense.paymentMethod}
                  </span>
                </td>

                <td className="text-end fw-semibold text-dark">
                  €{expense.amount.toFixed(2)}
                </td>

                <td className="text-center">
                  <div className="d-inline-flex align-items-center gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      aria-label={`Edit ${expense.description}`}
                    >
                      <i
                        className="bi bi-pencil"
                        aria-hidden="true"
                      ></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      aria-label={`Delete ${expense.description}`}
                    >
                      <i
                        className="bi bi-trash"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {visibleExpenses.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-5 text-muted">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 p-3 border-top bg-light">
        <div className="d-flex align-items-center gap-2">
          <label
            htmlFor="page-size"
            className="small text-muted text-nowrap"
          >
            Expenses per page
          </label>

          <select
            id="page-size"
            className="form-select form-select-sm"
            value={pageSize}
            onChange={handlePageSizeChange}
            style={{ width: "80px" }}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <nav aria-label="Expenses pagination">
          <ul className="pagination pagination-sm mb-0">
            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""
                }`}
            >
              <button
                type="button"
                className="page-link"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {pageNumbers.map((page) => (
              <li
                key={page}
                className={`page-item ${currentPage === page ? "active" : ""
                  }`}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={() => handlePageChange(page)}
                  aria-current={
                    currentPage === page ? "page" : undefined
                  }
                >
                  {page}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${currentPage === totalPages ? "disabled" : ""
                }`}
            >
              <button
                type="button"
                className="page-link"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ExpenseTable;
import Button from "../../../common/components/Button";
import { useModal } from "../../hooks/useModal";
import { useSpending } from "../../hooks/useSpending";
import DeleteSpendingModal from "../modals/DeleteSpendingModal";
import EditSpendingModal from "../modals/EditSpedingModal";

const PAGE_SIZE_OPTIONS = [10, 15, 25] as const;

const ExpenseTable = () => {
  const { spendings, totalElements, pageSize, totalPages, currentPage, getPaymentBadgeClass, formatPaymentMethod, changePage, first, last, startEditing, errors, handleChange, handleEdit, selectedSpending, loading, loadButton, editSpending, deleteSpending, handleDelete } = useSpending();

  const { openEditModal, editModalIsOpen, closeEditModal, customStyles, modalIsOpen, closeModal, openModal } = useModal();

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(date));
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
            {spendings.map((spending) => (
              <tr key={spending.id}>
                <td className="px-4 text-nowrap text-muted">
                  {formatDate(spending.date)}
                </td>

                <td>
                  <span className="fw-semibold text-dark">
                    {spending.description}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge rounded-pill ${getPaymentBadgeClass(
                      spending.paymentMethod
                    )}`}
                  >
                    {formatPaymentMethod(spending.paymentMethod)}
                  </span>
                </td>

                <td className="text-end fw-semibold text-dark">
                  €{spending.amount.toFixed(2)}
                </td>

                <td className="text-center">
                  <div className="d-inline-flex align-items-center gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => startEditing(spending, openEditModal)}
                      aria-label={`Edit ${spending.description}`}
                    >
                      <i
                        className="bi bi-pencil"
                        aria-hidden="true"
                      ></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(spending.id, openModal)}
                      aria-label={`Delete ${spending.description}`}
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

            {spendings.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-5 text-muted">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div>
        <div>
          {/* TODO: Add page size selector */}
        </div>

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
      </div>

      <EditSpendingModal
        modalIsOpen={editModalIsOpen}
        closeModal={closeEditModal}
        customStyles={customStyles}
        loadButton={loadButton}
        errors={errors}
        handleChange={handleChange}
        handleEdit={handleEdit}
        selectedSpending={selectedSpending}
        loading={loading}
        editSpending={editSpending}
      />

      <DeleteSpendingModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={customStyles}
        loadButton={loadButton}
        errors={errors}
        deleteSpending={deleteSpending}
        loading={loading}
      />
    </div>
  );
};

export default ExpenseTable;
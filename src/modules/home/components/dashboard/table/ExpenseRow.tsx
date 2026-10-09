import type { ExpenseRowProps } from "../../../../../types/types"

export const ExpenseRow = ({ spending, formatDate, getPaymentBadgeClass, formatPaymentMethod, startEditing, handleDelete, openModal, openEditModal }: ExpenseRowProps) => {

  return (
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
  )
}
import type { ExpenseRowProps } from "../../../../../types/types";
import ExpenseActions from "../common/ExpenseActions";

export const ExpenseRow = ({ spending, formatDate, getPaymentBadgeClass, formatPaymentMethod, startEditing, handleDelete, openModal, openEditModal }: ExpenseRowProps) => {

  return (
    <tr>
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
        <ExpenseActions
          spending={spending}
          onEdit={startEditing}
          onDelete={handleDelete}
          openEditModal={openEditModal}
          openModal={openModal}
        />
      </td>
    </tr>
  );
};
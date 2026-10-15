import type { ExpenseActionsProps } from "../../../../../types/types";

const ExpenseActions = ({
  spending,
  onEdit,
  onDelete,
  openEditModal,
  openModal,
  containerClassName = "d-inline-flex align-items-center gap-2",
  editButtonClassName = "btn btn-sm btn-outline-primary",
  deleteButtonClassName = "btn btn-sm btn-outline-danger",
}: ExpenseActionsProps) => {
  return (
    <div className={containerClassName}>
      <button
        type="button"
        className={editButtonClassName}
        onClick={() => onEdit(spending, openEditModal)}
        aria-label={`Edit ${spending.description}`}
      >
        <i className="bi bi-pencil" aria-hidden="true"></i>
      </button>

      <button
        type="button"
        className={deleteButtonClassName}
        onClick={() => onDelete(spending.id, openModal)}
        aria-label={`Delete ${spending.description}`}
      >
        <i className="bi bi-trash" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default ExpenseActions;

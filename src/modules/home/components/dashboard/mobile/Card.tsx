import type { CardProps } from "../../../../../types/types";
import ExpenseActions from "../common/ExpenseActions";

const Card = ({
  spendings,
  formatDate,
  getPaymentBadgeClass,
  formatPaymentMethod,
  startEditing,
  openEditModal,
  handleDelete,
  openModal
}: CardProps) => {
  return (
    <div className="d-flex flex-column gap-3">
      {spendings.map((spending) => (
        <div
          key={spending.id}
          className="card border-0 shadow-sm rounded-4 overflow-hidden"
        >
          <div className="card-body p-3">
            <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
              <div className="flex-grow-1">
                <div className="fw-semibold text-dark lh-sm mb-1">
                  {spending.description}
                </div>
                <div className="d-flex flex-wrap align-items-center gap-2">
                  <small className="text-muted">
                    <i className="bi bi-calendar3 me-1" aria-hidden="true"></i>
                    {formatDate(spending.date)}
                  </small>
                  <span
                    className={`badge rounded-pill ${getPaymentBadgeClass(
                      spending.paymentMethod
                    )}`}
                  >
                    {formatPaymentMethod(spending.paymentMethod)}
                  </span>
                </div>
              </div>

              <div className="text-end">
                <div className="small text-muted mb-1">Amount</div>
                <div className="fw-bold fs-5 text-dark">
                  €{spending.amount.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="border-top pt-3">
              <ExpenseActions
                spending={spending}
                onEdit={startEditing}
                onDelete={handleDelete}
                openEditModal={openEditModal}
                openModal={openModal}
                containerClassName="d-flex gap-2 w-100"
                editButtonClassName="btn btn-outline-primary btn-sm rounded-3 flex-fill"
                deleteButtonClassName="btn btn-outline-danger btn-sm rounded-3 flex-fill"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
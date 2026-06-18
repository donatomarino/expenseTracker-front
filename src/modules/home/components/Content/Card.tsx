import Modal from 'react-modal';
import type { CardProps } from "../../../../types/types";
import DeleteSpendingModal from '../Modals/DeleteSpendingModal';

Modal.setAppElement('#root');
const Card = ({ spendings, formatSpending, editingId, setEditingId, context, handleDelete, deleteSpending, openModal, modalIsOpen, closeModal, customStyles }: CardProps) => {
  return (
    <div className="d-flex flex-wrap align-items-start gap-4 mt-2">
      {spendings.map((spending) =>
        <div
          key={spending.id}
          className="card border-0 shadow-sm rounded-4 overflow-hidden"
          style={{ width: "18rem" }}
        >
          <div className="card-body p-4">
            {editingId === spending.id ? (
              <div>
                <div>
                  <h5 className="fw-bold mb-1 text-dark">Edit Spending</h5>
                  <p className="text-secondary mb-0 small">Update the details of your spending.</p>
                </div>
                <form className="bg-white rounded-4 p-3">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control form-control-l bg-light border-0 shadow-sm"
                      aria-label="Description"
                      placeholder={spending.description}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control form-control-l bg-light border-0 shadow-sm"
                      aria-label="Amount"
                      placeholder={spending.amount.toFixed(2)}
                    />
                  </div>

                  <div className="mb-2">
                    <input
                      type="date"
                      className="form-control form-control-l bg-light border-0 shadow-sm"
                      aria-label="Date"
                      defaultValue={spending.date}
                    />
                  </div>
                </form>
              </div>
            ) : (
              <>
                <h5 className="card-title fw-bold text-dark">{spending.description}</h5>
                <h6 className="card-subtitle mb-3 text-secondary">{formatSpending(spending.date)}</h6>
                <p className="card-text fs-4 fw-semibold text-primary mb-4">${spending.amount.toFixed(2)}</p>
              </>
            )}
            <button
              type="button"
              className="btn btn-outline-primary me-2"
              onClick={() => setEditingId(spending.id)}
              disabled={context.loadButton}
            >
              {editingId === spending.id ? 'Save' : 'Edit'}
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => handleDelete(spending.id, openModal)}
              disabled={context.loadButton}
            >
              {editingId === spending.id ? 'Cancel' : 'Delete'}
            </button>
          </div>
        </div>
      )}

      <DeleteSpendingModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={customStyles}
        context={context}
        deleteSpending={deleteSpending}
      />
    </div>
  )
}

export default Card;
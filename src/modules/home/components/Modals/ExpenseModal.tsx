import Modal from 'react-modal';
import 'bootstrap-icons/font/bootstrap-icons.css';
import type { ModalProps } from '../../../../types/types';

const ExpenseModal = (props: ModalProps) => {
  const {
    modalIsOpen,
    closeModal,
    customStyles,
    loadButton,
    newSpending,
    handleChange,
    handleSubmit
  } = props;

  return (
    <Modal
      isOpen={modalIsOpen}
      contentLabel="Add new spending"
      style={customStyles}
    >
      <div className="p-2">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold mb-1 text-dark">Add new expense</h3>
            <p className="text-secondary mb-0 small">Fill in the details of your new spending.</p>
          </div>

          <button
            type="button"
            className="btn-close"
            onClick={closeModal}
            disabled={loadButton}
            aria-label="Close"
          />
        </div>

        <div>
          <form className="bg-white rounded-4 p-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">Description</label>
              <input
                type="text"
                name="description"
                className="form-control form-control-lg bg-light border-0 shadow-sm"
                aria-label="Description"
                placeholder="e.g. Groceries"
                value={newSpending.description}
                onChange={handleChange}
                disabled={loadButton}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">Amount</label>
              <input
                type="text"
                name="amount"
                className="form-control form-control-lg bg-light border-0 shadow-sm"
                aria-label="Amount"
                placeholder="e.g. 24.99"
                value={newSpending.amount || ''}
                onChange={handleChange}
                disabled={loadButton}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold text-secondary">Date</label>
              <input
                type="date"
                name="date"
                className="form-control form-control-lg bg-light border-0 shadow-sm"
                aria-label="Date"
                value={newSpending.date}
                onChange={handleChange}
                disabled={loadButton}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary fw-semibold w-100 rounded-pill py-2 shadow-sm"
              disabled={loadButton}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add spending
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ExpenseModal;
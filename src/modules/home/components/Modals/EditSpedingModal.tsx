import Modal from "react-modal";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { BaseCardProps } from "../../../../types/types";
import FieldError from "../../../common/FieldError";

const EditSpendingModal = (props: BaseCardProps) => {
  const {
    modalIsOpen,
    closeModal,
    customStyles,
    loadButton,
    errors,
    handleChange,
    handleEdit,
    selectedSpending
  } = props;

  return (
    <Modal
      isOpen={modalIsOpen}
      contentLabel="Edit spending"
      style={customStyles}
    >
      <div className="p-2">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold mb-1 text-dark">Edit expense</h3>
            <p className="text-secondary mb-0 small">
              Update the details of your spending.
            </p>
          </div>

          <button
            type="button"
            className="btn-close"
            onClick={() => {
              closeModal();
            }}
            disabled={loadButton}
            aria-label="Close"
          />
        </div>

        <div>
          <form
            className="bg-white rounded-4 p-3"
            onSubmit={(e) => handleEdit(e, closeModal)}
            method="PUT"
          >
            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">
                Description
              </label>
              <input
                type="text"
                name="description"
                className="form-control form-control-lg bg-light border-0 shadow-sm"
                aria-label="Description"
                placeholder={selectedSpending?.description}
                onChange={handleChange}
                disabled={loadButton}
              />

              <FieldError error={errors?.description} />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">
                Amount
              </label>
              <input
                type="text"
                name="amount"
                className="form-control form-control-lg bg-light border-0 shadow-sm"
                aria-label="Amount"
                placeholder={selectedSpending?.amount.toFixed(2)}
                onChange={handleChange}
                disabled={loadButton}
              />

              <FieldError error={errors?.amount} />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold text-secondary">
                Date
              </label>
              <input
                type="date"
                name="date"
                className="form-control form-control-lg bg-light border-0 shadow-sm"
                aria-label="Date"
                defaultValue={selectedSpending?.date}
                onChange={handleChange}
                disabled={loadButton}
              />

              <FieldError error={errors?.date} />
            </div>

            <button
              type="submit"
              className="btn btn-primary fw-semibold w-100 rounded-pill py-2 shadow-sm mb-2"
              disabled={loadButton}
            >
              <i className="bi bi-check-circle me-2"></i>
              Save changes
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditSpendingModal;
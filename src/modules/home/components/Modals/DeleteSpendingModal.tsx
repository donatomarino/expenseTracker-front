import type { DeleteModalProps } from "../../../../types/types";
import Modal from 'react-modal';

const DeleteSpendingModal = ({ modalIsOpen, closeModal, customStyles, context, deleteSpending }: DeleteModalProps) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      contentLabel="Delete spending"
      style={customStyles}
    >
      <div className="p-3 text-center">
        <div className="mb-3">
          <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-danger bg-opacity-10 mb-3"
            style={{ width: "56px", height: "56px" }}>
            <i className="bi bi-trash3 text-danger fs-4"></i>
          </div>

          <h5 className="fw-bold text-dark mb-2">Delete this spending?</h5>
          <p className="text-secondary small mb-0">
            This action cannot be undone.
          </p>
        </div>

        <div className="d-flex justify-content-center gap-2 mt-4">
          <button
            type="button"
            className="btn btn-light border px-4"
            onClick={closeModal}
            disabled={context.loadButton}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-danger px-4 fw-semibold"
            disabled={context.loadButton}
            onClick={() => deleteSpending(closeModal)}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteSpendingModal;
import type { DeleteModalProps } from "../../../../types/types";
import Modal from 'react-modal';
import FullPageLoader from "../../../common/components/FullPageLoader";
import Button from "../../../common/components/Button";

const DeleteSpendingModal = (props: DeleteModalProps) => {
  const {
    isOpen,
    onClose,
    customStyles,
    loadButton,
    deleteSpending,
    loading
  } = props;

  return (
    <Modal
      isOpen={isOpen}
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
          <Button
            className="border px-4"
            variant="light"
            onClick={onClose}
            disabled={loadButton}
          >
            Cancel
          </Button>

          <Button
            className="px-4 fw-semibold"
            variant="danger"
            onClick={() => deleteSpending(onClose)}
            disabled={loadButton}
          >
            Delete
          </Button>
        </div>

        <FullPageLoader loading={loading} />
      </div>
    </Modal>
  );
};

export default DeleteSpendingModal;
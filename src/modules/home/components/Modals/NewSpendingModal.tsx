import Modal from 'react-modal';
import 'bootstrap-icons/font/bootstrap-icons.css';
import type { ModalProps } from '../../../../types/types';
import FullPageLoader from '../../../common/components/FullPageLoader';
import FormField from '../../../common/components/FormField';

const NewSpendingModal = (props: ModalProps) => {
  const {
    modalIsOpen,
    closeModal,
    customStyles,
    loadButton,
    newSpending,
    handleChange,
    handleSubmit,
    errors,
    loading
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
          <form className="bg-white rounded-4 p-3" onSubmit={(e) => handleSubmit(e, closeModal)}>

            <FormField
              label="Description"
              type="text"
              name="description"
              id="newSpendingDescription"
              onChange={handleChange}
              placeholder='e.g. Groceries'
              value={newSpending?.description}
              disabled={loadButton}
              error={errors?.description}
            />

            <FormField
              label="Amount"
              type="text"
              name="amount"
              id="newSpendingAmount"
              onChange={handleChange}
              placeholder='e.g. 24.99'
              disabled={loadButton}
              error={errors?.amount}
            />

            <FormField
              label="Date"
              type="date"
              name="date"
              id="newSpendingDate"
              onChange={handleChange}
              disabled={loadButton}
              error={errors?.date}
            />

            <button
              type="submit"
              className="btn btn-primary fw-semibold w-100 rounded-pill py-2 shadow-sm"
              disabled={loadButton}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add spending
            </button>

            {FullPageLoader(loading)}
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default NewSpendingModal;
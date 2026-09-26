import Modal from 'react-modal';
import 'bootstrap-icons/font/bootstrap-icons.css';
import type { NewSpendingModalProps } from '../../../../types/types';
import FullPageLoader from '../../../common/components/FullPageLoader';
import FormField from '../../../common/components/FormField';
import CloseButton from '../../../common/components/CloseButton';
import Button from '../../../common/components/Button';

/**
 * TODO: 
 * - El seleccionador de fechas tiene que tener solamente el año actual y los dos anteriores
 */
const NewSpendingModal = (props: NewSpendingModalProps) => {
  const {
    modalIsOpen,
    closeModal,
    customStyles,
    loadButton,
    newSpending,
    handleChange,
    handleSubmit,
    errors,
    setErrors,
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

          <CloseButton
            disabled={loadButton}
            onClick={() => { closeModal(), setErrors({}) }}
          />
        </div>

        <div>
          <form className="bg-white rounded-4 p-3" onSubmit={(e) => {
            handleSubmit(e, closeModal)
          }}>

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

            <Button
              type='submit'
              className='fw-semibold w-100'
              disabled={loadButton}
              variant='primary'
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add spending
            </Button>
            {FullPageLoader(loading)}
          </form>
        </div>
      </div>
    </Modal >
  );
};

export default NewSpendingModal;
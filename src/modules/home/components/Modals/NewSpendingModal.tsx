import Modal from 'react-modal';
import 'bootstrap-icons/font/bootstrap-icons.css';
import type { NewSpendingModalProps } from '../../../../types/types';
import FullPageLoader from '../../../common/components/FullPageLoader';
import FormField from '../../../common/components/FormField';
import CloseButton from '../../../common/components/CloseButton';
import Button from '../../../common/components/Button';
import { paymentMethodOptions } from '../dashboard/constants/paymenthMethodOptions';

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

            <div className="mb-3">
              <label
                htmlFor="newSpendingPaymentMethod"
                className="form-label fw-semibold text-dark mb-2"
              >
                Payment method
              </label>

              <div className="input-group">
                <span
                  className="input-group-text bg-light border-end-0 text-primary"
                  aria-hidden="true"
                >
                  <i className="bi bi-credit-card fs-5" />
                </span>

                <select
                  id="newSpendingPaymentMethod"
                  name="paymentMethod"
                  className="form-select border-start-0 rounded-end-3"
                  value={newSpending?.paymentMethod ?? "CREDIT_CARD"}
                  onChange={handleChange}
                  disabled={loadButton}
                >
                  {paymentMethodOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

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
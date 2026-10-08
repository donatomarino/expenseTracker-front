import Modal from "react-modal";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { BaseCardProps } from "../../../../types/types";
import FullPageLoader from "../../../common/components/FullPageLoader";
import FormField from "../../../common/components/FormField";
import CloseButton from "../../../common/components/CloseButton";
import Button from "../../../common/components/Button";
import { paymentMethodOptions } from "../dashboard/constants/paymenthMethodOptions";

const EditSpendingModal = (props: BaseCardProps) => {
  const {
    modalIsOpen,
    closeModal,
    customStyles,
    loadButton,
    errors,
    handleChange,
    handleEdit,
    selectedSpending,
    loading,
    editSpending
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

          <CloseButton
            disabled={loadButton}
            onClick={closeModal}
          />
        </div>

        <div>
          <form
            className="bg-white rounded-4 p-3"
            onSubmit={(e) => handleEdit(e, closeModal)}
            method="PUT"
          >
            <FormField
              label="Description"
              type="text"
              name="description"
              id="editSpendingDescription"
              onChange={handleChange}
              placeholder={selectedSpending?.description || ''}
              disabled={loadButton}
              error={errors?.description}
            />

            <FormField
              label="Amount"
              type="text"
              name="amount"
              id="editSpendingAmount"
              onChange={handleChange}
              placeholder={selectedSpending?.amount.toFixed(2) || ''}
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
                  value={editSpending?.paymentMethod || ""}
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
              type="text"
              name="date"
              id="editSpendingDate"
              onChange={handleChange}
              placeholder={selectedSpending?.date || ''}
              disabled={loadButton}
              error={errors?.date}
            />

            <Button
              type="submit"
              className="fw-semibold w-100 mt-2"
              variant="primary"
              disabled={loadButton}
            >
              <i className="bi bi-check-circle me-2"></i>
              Save changes
            </Button>
          </form>

          {FullPageLoader(loading)}
        </div>

      </div>
    </Modal>
  );
};

export default EditSpendingModal;
import Modal from 'react-modal';
import FormField from '../../../common/components/FormField';
import Button from '../../../common/components/Button';
import FullPageLoader from '../../../common/components/FullPageLoader';
import type { SpendingModalProps } from '../../../../types/types';
import HeaderModal from './components/HeaderModal';
import PaymentMethodField from './components/PaymentMethodField';
import "bootstrap-icons/font/bootstrap-icons.css";

const SpendingModal = ({
  isOpen,
  mode,
  customStyles,
  formValues,
  formIds,
  formPlaceHolders,
  errors,
  loading,
  loadButton,
  onClose,
  onChange,
  onSubmit
}: SpendingModalProps) => {

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
    >

      <div className="p-2">
        <HeaderModal
          mode={mode}
          loadButton={loadButton}
          onClose={onClose}
        />
      </div>

      <div>
        <form
          className="bg-white rounded-4 p-3"
          onSubmit={(e) => { onSubmit(e, onClose) }}
        >

          <FormField
            label="Description"
            type="text"
            name="description"
            id={formIds.description}
            value={formValues?.description || ''}
            onChange={onChange}
            placeholder={formPlaceHolders?.description || ''}
            error={errors.description}
            disabled={loadButton}
          />

          <FormField
            label="Amount"
            type="text"
            name="amount"
            id={formIds.amount}
            value={formValues?.amount ?? ''}
            onChange={onChange}
            placeholder={formPlaceHolders?.amount || ''}
            error={errors.amount}
            disabled={loadButton}
          />

          <PaymentMethodField
            htmlFor={formIds?.paymentMethod || ''}
            id={formIds?.paymentMethod || ''}
            value={formValues?.paymentMethod || ''}
            onChange={onChange}
            disabled={loadButton}
          />

          <FormField
            label="Date"
            type="date"
            name="date"
            id={formIds.date || ''}
            value={formValues?.date ?? ''}
            onChange={onChange}
            error={errors.date}
            disabled={loadButton}
          />

          <Button
            type="submit"
            className="fw-semibold w-100 mt-2"
            variant="primary"
            disabled={loadButton}
          >
            <i className={`bi ${mode === "new" ? "bi-plus-circle" : "bi-check-circle"} me-2`}></i>
            {mode === "new" ? "Add spending" : "Save changes"}
          </Button>
        </form>

        <FullPageLoader loading={loading} />
        {/* {FullPageLoader(loading)} */}
      </div>
    </Modal >
  );
}

export default SpendingModal;
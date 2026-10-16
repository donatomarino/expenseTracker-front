import 'bootstrap-icons/font/bootstrap-icons.css';
import Modal from 'react-modal';
import useHeader from '../../hooks/useHeader';
import Button from '../../../common/components/Button';
import type { SpendingFormIdAndPlaceHolder, SpendingFormValues } from '../../../../types/types';
import SpendingModal from '../modals/SpendingModal';

Modal.setAppElement('#root');
const Header = () => {

  const {
    newSpending,
    handleChange,
    handleSubmit,
    errors,
    loading,
    modalIsOpen,
    openModal,
    customStyles,
    headerWrapperStyle,
    handleCloseNewModal,
    handleLogout,
    loadButton
  } = useHeader();

  const formValues: SpendingFormValues = {
    description: newSpending?.description ?? '',
    amount: newSpending?.amount ? String(newSpending.amount) : '',
    paymentMethod: newSpending?.paymentMethod ?? "CREDIT_CARD",
    date: newSpending?.date ?? '',
  };

  const formIds: SpendingFormIdAndPlaceHolder = {
    description: "newSpendingDescription",
    amount: "newSpendingAmount",
    paymentMethod: "newSpendingPaymentMethod",
    date: "newSpendingDate"
  }

  const formPlaceHolders: SpendingFormIdAndPlaceHolder = {
    description: "e.g. Groceries",
    amount: "e.g. 24.99",
  }

  return (
    <div className={modalIsOpen ? 'bg-white' : 'sticky-top bg-white'} style={headerWrapperStyle}>
      <header className="d-flex justify-content-between align-items-center bg-white p-4 rounded-4 shadow-sm border mb-3" style={{ pointerEvents: modalIsOpen ? 'none' : 'auto' }}>
        <div>
          <p className="text-uppercase text-secondary fw-semibold small mb-1">
            Dashboard
          </p>
          <h1 className="h3 fw-bold text-dark mb-0">
            Hey, {localStorage.getItem('name')?.split(' ')[0]}
            <i
              className="bi bi-emoji-smile ms-2"
              aria-hidden="true"
            ></i>
          </h1>
        </div>

        <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2">
          <Button
            className="d-flex align-items-center justify-content-center gap-2"
            onClick={openModal}
            disabled={loadButton}
            variant="primary"
          >
            <i className="bi bi-file-plus" aria-hidden="true"></i>
            <span>Add spending</span>
          </Button>

          <Button
            className="d-flex align-items-center justify-content-center gap-2"
            variant="outlineDanger"
            onClick={handleLogout}
            disabled={loadButton}
          >
            <i className="bi bi-box-arrow-right" aria-hidden="true"></i>
            <span>Logout</span>
          </Button>
        </div>

        <SpendingModal
          isOpen={modalIsOpen}
          mode="new"
          customStyles={customStyles}
          loadButton={loadButton}
          onClose={handleCloseNewModal}
          formValues={formValues}
          formIds={formIds}
          formPlaceHolders={formPlaceHolders}
          onChange={handleChange}
          errors={errors}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </header>
    </div>
  );
};

export default Header;
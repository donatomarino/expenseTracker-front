import 'bootstrap-icons/font/bootstrap-icons.css';
import Modal from 'react-modal';
import { useModal } from '../hooks/useModal';
import ExpenseModal from './Modals/ExpenseModal';
import { useContent } from '../hooks/useContent';

Modal.setAppElement('#root');
const Header = () => {
  const {
    modalIsOpen,
    openModal,
    closeModal,
    customStyles,
    newSpending,
    handleChange,
    handleSubmit,
  } = useModal();

  const {
    loadButton
  } = useContent();

  return (
    <header className="d-flex justify-content-between align-items-center bg-white p-4 rounded-4 shadow-sm border">
      <div>
        <p className="text-uppercase text-secondary fw-semibold small mb-1">
          Dashboard
        </p>
        <h1 className="h3 fw-bold text-dark mb-0">
          Hey, {localStorage.getItem('user_name')?.split(' ')[0]}
        </h1>
      </div>

      <button
        type="button"
        className="btn btn-primary btn-lg rounded-pill px-4 shadow-sm"
        onClick={openModal}
        disabled={loadButton}
      >
        <i className="bi bi-file-plus me-2"></i>
        Add spending
      </button>

      <ExpenseModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={customStyles}
        loadButton={loadButton}
        newSpending={newSpending}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </header>
  );
};

export default Header;
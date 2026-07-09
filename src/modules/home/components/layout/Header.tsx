import 'bootstrap-icons/font/bootstrap-icons.css';
import Modal from 'react-modal';
import { useModal } from '../../hooks/useModal';
import NewSpendingModal from '../modals/NewSpendingModal';
import { useContent } from '../../hooks/useContent';
import useHeader from '../../hooks/useHeader';

Modal.setAppElement('#root');
const Header = () => {
  const {
    modalIsOpen,
    openModal,
    closeModal,
    customStyles,
  } = useModal();

  const {
    newSpending,
    handleChange,
    handleSubmit,
    errors,
    loading
  } = useHeader();

  const {
    loadButton,
  } = useContent();

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    window.location.href = "/login";
  }

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

      <div className="d-flex align-items-center gap-3">
        <button
          type="button"
          className="btn btn-primary btn-lg rounded-pill px-4 shadow-sm"
          onClick={openModal}
          disabled={loadButton}
        >
          <i className="bi bi-file-plus me-2"></i>
          Add spending
        </button>

        <button
          type="button"
          className="btn btn-outline-danger rounded-pill px-4 shadow-sm"
          onClick={() => handleLogout()}
          disabled={loadButton}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>

      <NewSpendingModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={customStyles}
        loadButton={loadButton}
        newSpending={newSpending}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        loading={loading}
      />
    </header>
  );
};

export default Header;
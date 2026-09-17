import 'bootstrap-icons/font/bootstrap-icons.css';
import Modal from 'react-modal';
import { useModal } from '../../hooks/useModal';
import NewSpendingModal from '../modals/NewSpendingModal';
import { useContent } from '../../hooks/useContent';
import useHeader from '../../hooks/useHeader';
import Button from '../../../common/components/Button';

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
    setErrors,
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
          Hey, Donato{localStorage.getItem('user_name')?.split(' ')[0]}
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

      <NewSpendingModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={customStyles}
        loadButton={loadButton}
        newSpending={newSpending}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        setErrors={setErrors}
        loading={loading}
      />
    </header>
  );
};

export default Header;
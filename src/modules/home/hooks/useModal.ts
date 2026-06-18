import { useContext, useState } from "react";
import { LoadButtonContext } from "../../../context/LoadButtonContext";

export const useModal = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const context = useContext(LoadButtonContext);

  if (!context) {
    throw new Error('LoadButtonContext must be used within a LoadButtonProvider');
  }

  const customStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: 'rgba(15, 23, 42, 0.55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    },
    content: {
      position: 'relative',
      inset: 'auto',
      maxWidth: '520px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      border: 'none',
      borderRadius: '24px',
      padding: '1.5rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.18)',
    },
  };

  // Open and close new spending modal
  const openModal = () => { setIsOpen(true) }
  const closeModal = () => { setIsOpen(false) }

  // Open and close delete spending modal
  const openDeleteModal = () => { setDeleteModalIsOpen(true) }
  const closeDeleteModal = () => { setDeleteModalIsOpen(false) }

  return { openModal, closeModal, openDeleteModal, closeDeleteModal, deleteModalIsOpen, modalIsOpen, setIsOpen, customStyles, context };
}
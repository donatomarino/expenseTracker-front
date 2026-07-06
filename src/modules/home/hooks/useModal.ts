import { useState } from "react";

export const useModal = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);

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

  // Open and close edit spending modal
  const openEditModal = () => { setEditModalIsOpen(true) }
  const closeEditModal = () => { setEditModalIsOpen(false) }

  return { openModal, closeModal, openDeleteModal, closeDeleteModal, openEditModal, closeEditModal, deleteModalIsOpen, modalIsOpen, editModalIsOpen, customStyles };
}
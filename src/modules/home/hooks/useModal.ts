import { useState } from "react";
import type { UseModalResult } from "../../../types/types";

export const useModal = (): UseModalResult => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);

  const customStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: 'var(--app-overlay)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 2000,
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
      backgroundColor: 'var(--app-surface)',
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

  const headerWrapperStyle = modalIsOpen
    ? { zIndex: 0, pointerEvents: 'none' as const }
    : { zIndex: 1030 };

  return { openModal, closeModal, openDeleteModal, closeDeleteModal, openEditModal, closeEditModal, deleteModalIsOpen, modalIsOpen, editModalIsOpen, customStyles, headerWrapperStyle };
}
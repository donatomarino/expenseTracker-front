import useNewSpendingForm from "./useNewSpendingForm";
import useCreateSpending from "./useCreateSpending";
import { useModal } from "./useModal";
import type { UseHeaderResult } from "../../../types/types";
import { useContext } from "react";
import { LoadingContext } from "../../../context/LoadingContext";

const useHeader = (): UseHeaderResult => {
  const { loadButton } = useContext(LoadingContext);

  const {
    modalIsOpen,
    openModal,
    closeModal,
    customStyles,
    headerWrapperStyle,
  } = useModal();

  const {
    newSpending,
    handleChange,
    resetNewSpending,
  } = useNewSpendingForm();

  const {
    handleSubmit,
    errors,
    clearErrors,
    loading,
  } = useCreateSpending({
    newSpending,
    resetNewSpending,
    closeModal,
  });

  // Close modal and clean errors
  const handleCloseNewModal = () => {
    closeModal();
    clearErrors();
    resetNewSpending();
  };

  // Redirects the user to the login page
  const handleLogout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.href = "/login";
  };

  return {
    newSpending,
    handleChange,
    handleSubmit,
    errors,
    clearErrors,
    loading,
    resetNewSpending,
    modalIsOpen,
    openModal,
    closeModal,
    customStyles,
    headerWrapperStyle,
    handleCloseNewModal,
    handleLogout,
    loadButton
  };
};

export default useHeader;
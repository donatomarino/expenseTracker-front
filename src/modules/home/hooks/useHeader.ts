import { useContext, useState } from "react";
import type { SpendingFormData } from "../../../types/types";
import { LoadingContext } from "../../../context/LoadingContext";
import contentService from "../services/contentService";
import { toast } from "react-toastify";
import { useLoad } from "../../common/hooks/useLoad";
import useFormErrors from "./useFormErrors";
import { useModal } from "./useModal";

const useHeader = () => {

  const initialSpendingState: SpendingFormData = {
    description: '',
    date: '',
    amount: '',
    paymentMethod: 'CREDIT_CARD',
  };

  const {
    modalIsOpen,
    openModal,
    closeModal,
    customStyles,
    headerWrapperStyle
  } = useModal();

  // New spending datas
  const [newSpending, setNewSpending] = useState<SpendingFormData>(initialSpendingState);

  // Disabled buttons
  const { disabledButton } = useContext(LoadingContext);

  // Reload spendings
  const { triggerReload } = useContext(LoadingContext);

  // Errors
  const { errors, setErrors, clearErrors } = useFormErrors();

  // Spinner loader
  const { loading, startLoading, stopLoading } = useLoad();

  // Input change handler for new spending form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    if (!newSpending) return;

    setNewSpending((previous) => ({
      ...previous,
      [e.target.name]: e.target.value
    }))
  }

  // Resets the spending form to its initial state
  const resetNewSpending = (): void => {
    setNewSpending(initialSpendingState);
  };
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
  }

  // Form submission for adding new spending
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>, closeModal: () => void): Promise<void> => {
    e.preventDefault();

    if (!newSpending) {
      toast.error("Server error");
      return;
    }

    disabledButton();
    startLoading();
    try {
       // Normalize the amount before sending it to the backend
      const payload = {
        ...newSpending,
        amount: Number(newSpending.amount.replace(",", "."))
      }

      // Call the service to add new spending
      await contentService.addSpending(payload);

      // Show success message and reload spendings
      toast.success('Spending added successfully');
      triggerReload();
      setErrors({});
      setNewSpending(initialSpendingState);
      closeModal();

    } catch (e: any) {
      if (e.response && e.response.status === 400) {
        const errors = e.response.data;

        setErrors(errors);
      } else {
        console.error("Error submitting new spending", e);
        toast.error("Server error");
      }
    } finally {
      disabledButton();
      stopLoading();
    }
  }

  return { newSpending, handleChange, handleSubmit, errors, clearErrors, loading, resetNewSpending, modalIsOpen, openModal, customStyles, headerWrapperStyle, handleCloseNewModal, handleLogout };
}

export default useHeader;
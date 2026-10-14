import { useContext } from "react";
import { toast } from "react-toastify";
import { LoadingContext } from "../../../context/LoadingContext";
import contentService from "../services/contentService";
import useFormErrors from "./useFormErrors";
import { useLoad } from "../../common/hooks/useLoad";
import type { Errors, UseCreateSpendingParams } from "../../../types/types";

export interface UseCreateSpendingResult {
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
  errors: Errors;
  clearErrors: () => void;
  loading: boolean;
}

const useCreateSpending = ({
  newSpending,
  resetNewSpending,
  closeModal,
}: UseCreateSpendingParams): UseCreateSpendingResult => {
  const { disabledButton, triggerReload } = useContext(LoadingContext);
  const { errors, setErrors, clearErrors } = useFormErrors();
  const { loading, startLoading, stopLoading } = useLoad();

  // Form submission for adding new spending
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    disabledButton();
    startLoading();

    try {
      // Normalize the amount before sending it to the backend
      const payload = {
        ...newSpending,
        amount: Number(newSpending.amount.replace(",", ".")),
      };

      await contentService.addSpending(payload);

      // Show success message and reload spendings
      toast.success("Spending added successfully");
      triggerReload();
      clearErrors();
      resetNewSpending();
      closeModal();
    } catch (e: any) {
      if (e.response && e.response.status === 400) {
        setErrors(e.response.data);
      } else {
        console.error("Error submitting new spending", e);
        toast.error("Server error");
      }
    } finally {
      disabledButton();
      stopLoading();
    }
  };

  return {
    handleSubmit,
    errors,
    clearErrors,
    loading,
  };
};

export default useCreateSpending;
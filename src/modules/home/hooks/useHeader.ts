import { useContext, useState } from "react";
import type { Errors, Requests, Spending } from "../../../types/types";
import { LoadingContext } from "../../../context/LoadingContext";
import contentService from "../services/contentService";
import { toast } from "react-toastify";
import { useLoad } from "../../common/hooks/useLoad";

const useHeader = () => {
  // New spending datas
  const [newSpending, setNewSpending] = useState<Spending | null>({
    description: '',
    amount: 0,
    date: ''
  });

  // Disabled buttons
  const { disabledButton } = useContext(LoadingContext);

  // Reload spendings
  const { triggerReload } = useContext(LoadingContext);

  // Errors
  const [errors, setErrors] = useState<Errors>({});

  // Spinner loader
  const { loading, startLoading, stopLoading } = useLoad();

  // Input change handler for new spending form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!newSpending) return;

    setNewSpending({
      ...newSpending,
      [e.target.name]: e.target.value
    });
  }

  // Form submission for adding new spending
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>, closeModal: () => void): Promise<void> => {
    e.preventDefault();
    disabledButton();

    if (!newSpending) {
      toast.error("Server error");
      return;
    }

    startLoading();
    try {
      const res: Requests<Spending> = await contentService.addSpending(newSpending);

      if (res.success) {
        toast.success('Spending added successfully');
        triggerReload();
        setErrors({});
        setNewSpending(null);
        closeModal();
      }
    } catch (e: any) {
      console.log(e.response);
      if (e.response && e.response.status === 422) {
        const errors = e.response.data.errors;

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

  return { newSpending, handleChange, handleSubmit, errors, loading };
}

export default useHeader;
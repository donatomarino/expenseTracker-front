import { useContext, useState } from "react";
import type { Errors, Requests, Spending } from "../../../types/types";
import { LoadingContext } from "../../../context/LoadingContext";
import contentService from "../services/contentService";
import { toast } from "react-toastify";

const useHeader = () => {
  const [newSpending, setNewSpending] = useState<Spending | null>({
    description: '',
    amount: 0,
    date: ''
  });

  const { disabledButton } = useContext(LoadingContext);
  const { triggerReload } = useContext(LoadingContext);
  const [errors, setErrors] = useState<Errors>({});

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
    }
  }

  return { newSpending, handleChange, handleSubmit, errors };
}

export default useHeader;
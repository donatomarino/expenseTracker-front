import { useState } from "react";
import type { SpendingFormData } from "../../../types/types";

const initialSpendingState: SpendingFormData = {
  description: "",
  date: "",
  amount: "",
  paymentMethod: "CREDIT_CARD",
};

const useNewSpendingForm = () => {
  const [newSpending, setNewSpending] = useState<SpendingFormData>(initialSpendingState);

  // Input change handler for new spending form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setNewSpending((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  // Resets the spending form to its initial state
  const resetNewSpending = (): void => {
    setNewSpending(initialSpendingState);
  };

  return {
    newSpending,
    setNewSpending,
    handleChange,
    resetNewSpending,
    initialSpendingState,
  };
};

export default useNewSpendingForm;
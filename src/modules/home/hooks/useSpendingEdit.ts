import { useState } from "react";
import type { Spending, UseSpendingEditParams } from "../../../types/types";
import { toast } from "react-toastify";
import contentService from "../services/contentService";

const useSpendingEdit = ({
  disabledButton,
  startLoading,
  stopLoading,
  triggerReload,
  setErrors,
  clearErrors,
}: UseSpendingEditParams) => {
  
  const [editSpending, setEditSpending] = useState<Spending | null>(null);
  const [selectedSpending, setSelectedSpending] = useState<Spending | null>(null);

  // Edit spending
  const startEditing = (spending: Spending, openEditModal: () => void) => {
    if (spending.id !== undefined && spending.id !== null) {

      setSelectedSpending(spending);
      setEditSpending(spending);

      openEditModal();
    } else {
      console.error("Invalid spending selected for editing");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    if (!editSpending) return;

    setEditSpending({
      ...editSpending,
      [e.target.name]: e.target.value
    });
  }

  const handleEdit = async (e: React.SubmitEvent<HTMLFormElement>, closeModal: () => void): Promise<void> => {
    e.preventDefault();
    disabledButton();

    if (!editSpending || !selectedSpending) {
      toast.error("Server error");
      disabledButton();
      return;
    }

    const noChanges =
      editSpending.description === selectedSpending?.description &&
      editSpending.amount === selectedSpending?.amount &&
      editSpending.date === selectedSpending?.date &&
      editSpending.paymentMethod === selectedSpending?.paymentMethod;

    if (noChanges) {
      toast.error('You have to modify at least one field');
      disabledButton();
      return;
    }

    startLoading();
    try {
      // Normalize the amount before sending it to the backend
      const payload = {
        ...editSpending,
        amount: Number(editSpending.amount.toString().replace(",", "."))
      };

      await contentService.editSpending(payload);

      toast.success('Spending updated successfully');
      closeModal();
      triggerReload();
      clearErrors();

    } catch (e: any) {
      if (e.response && e.response.status === 400) {
        const errors = e.response.data;

        setErrors(errors);
      } else {
        console.error("The request failed: ", e);
        toast.error("Server error");
      }
    } finally {
      disabledButton();
      stopLoading();
    }
  }

  return {editSpending, selectedSpending, startEditing, handleChange, handleEdit}
}

export default useSpendingEdit;
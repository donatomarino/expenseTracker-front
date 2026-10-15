import { useState } from "react";
import { toast } from "react-toastify";
import contentService from "../services/contentService";
import type {
  UseSpendingDeleteParams,
} from "../../../types/types";

const useSpendingDelete = ({
  startLoading,
  triggerReload,
  stopLoading,
}: UseSpendingDeleteParams) => {
  const [selectedSpendingId, setSelectedSpendingId] = useState<number | null>(null);

  const handleDelete = (id: number, openModal: () => void): void => {
    setSelectedSpendingId(id);
    openModal();
  };

  const deleteSpending = async (closeModal: () => void): Promise<void> => {
    if (selectedSpendingId === null) {
      toast.error("Server error");
      return;
    }

    startLoading();
    try {
      await toast.promise(contentService.deleteSpending(selectedSpendingId), {
        pending: "Deleting spending...",
        success: "Spending deleted successfully",
        error: "Error deleting spending",
      });

      closeModal();
      triggerReload?.();
    } catch (e) {
      console.error("Server error", e);
    } finally {
      stopLoading();
    }
  };

  return { handleDelete, deleteSpending };
};

export default useSpendingDelete;
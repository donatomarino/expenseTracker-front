import { useContext, useEffect, useState } from "react";
import type { Spendings, Errors, Requests } from "../../../types/types";
import contentService from "../services/contentService";
import { toast } from "react-toastify";
import { LoadingContext } from "../../../context/LoadingContext";
import { useLoad } from "../../common/hooks/useLoad";

export const useContent = () => {
  const { loadButton, disabledButton, reload, triggerReload } = useContext(LoadingContext);

  // State for spendings and initial spendings
  const [initialSpendings, setInitialSpendings] = useState<Spendings[]>([]);
  const [spendings, setSpendings] = useState<Spendings[]>([]);

  // State for editing spending
  const [editSpending, setEditSpending] = useState<Spendings | null>(null);
  const [selectedSpending, setSelectedSpending] = useState<Spendings | null>(null);

  // Filters
  const [minAmount, setMinAmount] = useState<string>('');
  const [maxAmount, setMaxAmount] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // State for selected spending ID and errors
  const [selectedSpendingId, setSelectedSpendingId] = useState<number | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  // Spinner loader
  const { loading, startLoading, stopLoading } = useLoad();

  // Load spendings 
  // useEffect(() => {
  //   const fetchs = async () => {
  //     try {
  //       const res: Requests<Spendings[]> = await contentService.getSpending();

  //       if (res.success) {
  //         const sortedSpendings = sortSpendingsByDateDesc(res.data);
  //         setInitialSpendings(sortedSpendings);
  //       } else {
  //         toast.error('Error when charging expenses');
  //       }
  //     } catch (e: any) {
  //       console.error('The request failed: ', e);
  //     }
  //   }
  //   fetchs();
  // }, [reload]);

  useEffect(() => {
    setSpendings(initialSpendings)
  }, [initialSpendings]);

  // Format spending date
  const formatSpending = (date: string): string => {
    const today = new Date();
    const spendingDate = new Date(date);

    const msPerDay = 24 * 60 * 60 * 1000;
    const daysAgo = Math.floor((today.getTime() - spendingDate.getTime()) / msPerDay);

    if (daysAgo < 7) {
      if (daysAgo === 0) return 'Today';
      if (daysAgo === 1) return '1 day ago';
      return `${daysAgo} days ago`;
    }

    return date.split('-').reverse().join('/'); // Format as DD/MM/YYYY
  }

  // Sort spendings by date desc
  const sortSpendingsByDateDesc = (spendings: Spendings[]): Spendings[] => {
    return [...spendings].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  // Order by date
  const orderByDate = (): void => {
    setSpendings(sortSpendingsByDateDesc(initialSpendings));
  }

  // Order by amount
  const orderByAmount: () => void = () => {
    const sortedByAmount = [...initialSpendings].sort((a, b) => b.amount - a.amount);
    setSpendings(sortedByAmount);
  }

  // Order by description
  const orderByDescription = (): void => {
    const sortedByDescription = [...initialSpendings].sort((a, b) => a.description.localeCompare(b.description));
    setSpendings(sortedByDescription);
  }

  // Search spendings by description
  const setSearch = (searchTerm: string): void => {
    if (searchTerm.length > 2) {
      const filteredSpendings = initialSpendings.filter(spending => spending.description.toLowerCase().includes(searchTerm.toLowerCase()));
      setSpendings(filteredSpendings);
    } else {
      orderByDate(); // Reset to the original order if search term is less than 3 characters
    }
  }

  // Filter by amount
  const filterByAmount = (): void => {
    // Validate inputs
    if (Number(maxAmount) < Number(minAmount)) {
      toast.error("Max amount must be greater than min amount");
      return;
    }

    // Check if both minAmount and maxAmount are empty
    if (!minAmount && !maxAmount) {
      toast.error("You must enter at least one amount");
      return;
    }

    // Filter spending withouth minAmount
    if (!minAmount) {
      const filteredSpendings = initialSpendings.filter(spending => spending.amount <= Number(maxAmount));
      setSpendings(filteredSpendings);
      return;
    }

    // Filter spending withouth maxAmount
    if (!maxAmount) {
      const filteredSpendings = initialSpendings.filter(spending => spending.amount >= Number(minAmount));
      setSpendings(filteredSpendings);
      return;
    }

    // Validate that amounts are greater than 0
    if (Number(minAmount) < 0 || Number(maxAmount) < 0) {
      toast.error("Amounts must be greater than 0");
      return;
    }

    const filteredSpendings = initialSpendings.filter(spending => spending.amount >= Number(minAmount) && spending.amount <= Number(maxAmount));
    setSpendings(filteredSpendings);
  }

  // Filter by date range
  const filterByDateRange = (): void => {
    const filtered = spendings.filter((initialSpending) => {
      const spendingDate = new Date(initialSpending.date);

      if (startDate && spendingDate < new Date(startDate)) return false;
      if (endDate && spendingDate > new Date(endDate)) return false;

      return true;
    });

    setSpendings(filtered);
  };

  // Restore the original spendings and reset filters
  const restoreSpendings = (): void => {
    setSpendings(initialSpendings);
    setMinAmount("");
    setMaxAmount("");
    setStartDate("");
    setEndDate("");
  }

  // Total amount of all spending
  const totalAmount: number = spendings.reduce((total, spending) => total + spending.amount, 0);

  // Delete
  const handleDelete = (id: number, openModal: () => void): void => {
    setSelectedSpendingId(id);
    openModal();
  }

  const deleteSpending = async (closeModal: () => void): Promise<void> => {
    if (selectedSpendingId === null) {
      toast.error("Server error");
      return;
    }

    startLoading();
    try {
      await toast.promise(
        contentService.deleteSpending(selectedSpendingId),
        {
          pending: "Deleting spending...",
          success: "Spending deleted successfully",
          error: "Error deleting spending",
        }
      );

      closeModal();
      triggerReload();
    } catch (e) {
      console.error('Server error', e);
    } finally {
      stopLoading();
    }
  }

  // Edit
  const startEditing = (spending: Spendings, openEditModal: () => void) => {
    if (spending.id !== undefined && spending.id !== null) {

      setSelectedSpending(spending);
      setEditSpending(spending);

      setErrors({});
      openEditModal();
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    if (!editSpending) return;

    const fieldName = e.target.name;
    const fieldValue = fieldName === 'amount'
      ? Number(e.target.value)
      : e.target.value;

    const nextEditSpending = {
      ...editSpending,
      [fieldName]: fieldValue,
    };

    setEditSpending(nextEditSpending);

    if (selectedSpending) {
      setSelectedSpending({
        ...selectedSpending,
        [fieldName]: fieldValue,
      });
    }
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
      const res: Requests<Spendings> = await contentService.editSpending(editSpending);

      if (res.success) {
        toast.success('Spending updated successfully');
        closeModal();
        triggerReload();
      }
    } catch (e: any) {
      if (e.response && e.response.status === 422) {
        const errors = e.response.data.errors;

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

  return {
    spendings,
    formatSpending,
    loadButton,
    errors,
    orderByDate,
    orderByAmount,
    orderByDescription,
    setSearch,
    filterByAmount,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filterByDateRange,
    restoreSpendings,
    minAmount,
    setMinAmount,
    maxAmount,
    setMaxAmount,
    totalAmount,
    handleDelete,
    deleteSpending,
    startEditing,
    selectedSpending,
    handleChange,
    handleEdit,
    loading
  };
}
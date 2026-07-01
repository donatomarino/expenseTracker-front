import { useContext, useEffect, useState } from "react";
import type { Spending, Errors } from "../../../types/types";
import contentService from "../services/contentService";
import { toast } from "react-toastify";
import { LoadingContext } from "../../../context/LoadingContext";

export const useContent = () => {
  const [initialSpendings, setInitialSpendings] = useState<Spending[]>([]);
  const [editSpending, setEditSpending] = useState<Spending>({
    id: 0,
    description: '',
    amount: 0,
    date: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const { loadButton, disabledButton, reload, triggerReload } = useContext(LoadingContext);

  useEffect(() => {
    const fetchs = async () => {
      try {
        const res = await contentService.getSpending();

        if (res.success) {
          setInitialSpendings(res.data);
        } else {
          toast.error('Error when charging expenses');
        }
      } catch (e: any) {
        console.error('The request failed: ', e);
      }
    }
    fetchs();
  }, [reload]);

  useEffect(() => {
    setSpendings(initialSpendings)
  }, [initialSpendings]);

  const [spendings, setSpendings] = useState<Spending[]>(initialSpendings);
  const [minAmount, setMinAmount] = useState<string>('');
  const [maxAmount, setMaxAmount] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedSpendingId, setSelectedSpendingId] = useState<number | null>(null);

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

  const orderByDate = (): void => {
    // Create a new array to avoid mutating the original state
    const sortedByDate = [...initialSpendings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setSpendings(sortedByDate);
  }

  const orderByAmount: () => void = () => {
    const sortedByAmount = [...spendings].sort((a, b) => b.amount - a.amount);
    setSpendings(sortedByAmount);
  }

  const orderByDescription = (): void => {
    const sortedByDescription = [...spendings].sort((a, b) => a.description.localeCompare(b.description));
    setSpendings(sortedByDescription);
  }

  const setSearch = (searchTerm: string): void => {
    if (searchTerm.length > 2) {
      const filteredSpendings = initialSpendings.filter(spending => spending.description.toLowerCase().includes(searchTerm.toLowerCase()));
      setSpendings(filteredSpendings);
    } else {
      orderByDate(); // Reset to the original order if search term is less than 3 characters
    }
  }

  const filterByAmount = (): void => {
    const filteredSpendings = initialSpendings.filter(spending => spending.amount >= Number(minAmount) && spending.amount <= Number(maxAmount));
    setSpendings(filteredSpendings);
  }

  const filterByDateRange = (): void => {
    const filtered = spendings.filter((spending) => {
      const spendingDate = new Date(spending.date);

      if (startDate && spendingDate < new Date(startDate)) return false;
      if (endDate && spendingDate > new Date(endDate)) return false;

      return true;
    });

    setSpendings(filtered);
  };

  const restoreSpendings = (): void => {
    setSpendings(initialSpendings);
  }

  const totalAmount: number = spendings.reduce((total, spending) => total + spending.amount, 0);

  const handleDelete = (id: number, openModal: () => void): void => {
    setSelectedSpendingId(id);
    openModal();
  }

  const deleteSpending = (closeModal: () => void): void => {
    setSpendings(spendings.filter((s) => s.id !== selectedSpendingId));
    closeModal();
  }

  const startEditing = (spending: Spending) => {
    if (spending.id !== undefined && spending.id !== null) {
      setEditingId(spending.id);
      setErrors({});
    }

    setEditSpending({
      id: spending.id,
      description: spending.description,
      amount: spending.amount,
      date: spending.date
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditSpending({
      ...editSpending,
      [e.target.name]: e.target.value
    });
  }

  const handleEdit = async (e: React.SubmitEvent<HTMLFormElement>, spending: Spending): Promise<void> => {
    e.preventDefault();
    disabledButton();

    const noChanges =
      editSpending.description === spending.description &&
      editSpending.amount === spending.amount &&
      editSpending.date === spending.date;

    if (noChanges) {
      toast.error('You have to modify at least one field');
      disabledButton();
      return;
    }

    try {
      const res = await contentService.editSpending(editSpending);

      if (res.success) {
        toast.success('Spending updated successfully');
        triggerReload();
        setEditingId(null);
      }
    } catch (e: any) {
      if(e.response && e.response.status === 422) {
        const errors = e.response.data.errors;

        setErrors(errors);
      } else {
        console.log("The request failed: ", e);
        toast.error("Server error");
      }
    } finally {
      disabledButton();
    }
  }

  return {
    spendings,
    formatSpending,
    editingId,
    setEditingId,
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
    handleChange,
    handleEdit
  };
}
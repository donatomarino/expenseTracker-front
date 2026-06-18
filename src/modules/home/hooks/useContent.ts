import { useState } from "react";
import type { Spending } from "../../../types/types";

export const useContent = () => {
  const initialSpendings: Spending[] = [
    { id: 1, description: 'Groceries', amount: 50, date: '2026-06-13' },
    { id: 2, description: 'Gas', amount: 30, date: '2026-06-14' },
    { id: 3, description: 'Utilities', amount: 100, date: '2026-06-3' },
  ]

  const [spendings, setSpendings] = useState<Spending[]>(initialSpendings);
  const [minAmount, setMinAmount] = useState<string>('');
  const [maxAmount, setMaxAmount] = useState<string>('');
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

  const orderByDate= (): void => {
    // Create a new array to avoid mutating the original state
    const sortedByDate = [...spendings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setSpendings(sortedByDate);
  }

  const orderByAmount: () => void = () => {
    const sortedByAmount = [...spendings].sort((a, b) => b.amount - a.amount);
    setSpendings(sortedByAmount);
  }

  const orderByDescription= (): void => {
    const sortedByDescription = [...spendings].sort((a, b) => a.description.localeCompare(b.description));
    setSpendings(sortedByDescription);
  }

  const setSearch = (searchTerm: string): void => {
    if(searchTerm.length > 2) {
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

  const restoreSpendings = (): void => {
    setSpendings(initialSpendings);
  }

  const totalAmount: number = spendings.reduce((total, spending) => total + spending.amount, 0);

  const handleDelete = (id: number, openModal: () => void): void => {
    if(editingId === id) {
      setEditingId(null)
    } else {
      setSelectedSpendingId(id);
      openModal();
    }
  }

  const deleteSpending = (closeModal: () => void): void => {
    setSpendings(spendings.filter((s) => s.id !== selectedSpendingId));
    closeModal();
  }

  return {
    spendings,
    formatSpending,
    editingId,
    setEditingId,
    orderByDate,
    orderByAmount,
    orderByDescription,
    setSearch,
    filterByAmount,
    restoreSpendings,
    minAmount,
    setMinAmount,
    maxAmount,
    setMaxAmount,
    totalAmount,
    handleDelete,
    deleteSpending
  };
}
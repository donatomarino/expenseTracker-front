import { useContext, useState } from "react"
import { LoadingContext } from "../../../context/LoadingContext";
import { useSpendingContext } from "../../../context/SpendingContext";
import { useLoad } from "../../common/hooks/useLoad";
import useFormErrors from "./useFormErrors";
import useSpendingList from "./useSpendingList";
import usePaymentMethodUI from "./usePaymenthMethodUI";
import spendingUtils from "../utils/spending.utils";
import useSpendingEdit from "./useSpendingEdit";
import useSpendingDelete from "./useSpendingDelete";
import type { UseSpendingResult } from "../../../types/types";

export const useSpending = (): UseSpendingResult => {
  // Main orchestration hook for the spending dashboard:
  // it combines list loading, pagination, editing and deletion flows.
  const { reload, disabledButton, triggerReload, loadButton } = useContext(LoadingContext);
  const {
    year,
    months,
    month,
    spendings,
    setSpendings,
    setDateSearchMode,
    dateSearchMode,
    startDate,
    endDate,
    selectedSort,
    pageSize,
    setPageSize
  } = useSpendingContext();

  // Spinner loader
  const { loading, startLoading, stopLoading } = useLoad();
  // Form errors
  const { errors, setErrors, clearErrors } = useFormErrors();

  // Search state 
  const [search, setSearch] = useState<string>("");

  const { getPaymentBadgeClass, formatPaymentMethod } = usePaymentMethodUI();
  const { formatDate, formatDateForRequest } = spendingUtils();

  const {
    currentPage,
    totalPages,
    totalElements,
    first,
    last,
    statistics,
    changePage } = useSpendingList({
      reload,
      year,
      month,
      months,
      dateSearchMode,
      startDate,
      endDate,
      search,
      selectedSort,
      pageSize,
      setSpendings,
      setPageSize,
      formatDateForRequest,
    });

  const { editSpending, selectedSpending, startEditing, handleEdit, handleChange } = useSpendingEdit({
    disabledButton,
    startLoading,
    triggerReload,
    setErrors,
    clearErrors,
    stopLoading
  });

  const { handleDelete, deleteSpending } = useSpendingDelete({
    startLoading,
    triggerReload,
    stopLoading
  });

  // Toggle last 90 days mode
  const toggleLast90Days = (): void => {
    setDateSearchMode((currentMode: string) =>
      currentMode === "last90Days" ? "customRange" : "last90Days");
  };

  return {
    spendings,
    currentPage,
    pageSize,
    setPageSize,
    totalElements,
    totalPages,
    getPaymentBadgeClass,
    formatPaymentMethod,
    toggleLast90Days,
    changePage,
    first,
    last,
    statistics,
    search,
    setSearch,
    startEditing,
    handleChange,
    handleEdit,
    errors,
    clearErrors,
    selectedSpending,
    loading,
    loadButton,
    editSpending,
    handleDelete,
    deleteSpending,
    formatDate,
  };
};
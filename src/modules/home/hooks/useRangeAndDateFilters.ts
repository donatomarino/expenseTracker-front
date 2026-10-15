import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSpendingContext } from "../../../context/SpendingContext";
import { useSpending } from "./useSpending";
import type { UseRangeAndDateFiltersReturn, DraftFilters } from "../../../types/types";


const useRangeAndDateFilters = (): UseRangeAndDateFiltersReturn => {
  const { toggleLast90Days } = useSpending();
  const {
    dateSearchMode,
    paymentMethod,
    minAmount,
    maxAmount,
    startDate,
    endDate,
    setPaymentMethod,
    setMinAmount,
    setMaxAmount,
    setStartDate,
    setEndDate,
  } = useSpendingContext();

  const [draft, setDraft] = useState<DraftFilters>({
    paymentMethod: paymentMethod ?? "",
    minAmount: minAmount ?? "",
    maxAmount: maxAmount ?? "",
    startDate: startDate ?? "",
    endDate: endDate ?? "",
  });

  useEffect(() => {
    setDraft({
      paymentMethod: paymentMethod ?? "",
      minAmount: minAmount ?? "",
      maxAmount: maxAmount ?? "",
      startDate: startDate ?? "",
      endDate: endDate ?? "",
    });
  }, [paymentMethod, minAmount, maxAmount, startDate, endDate]);

  const handleChange = (field: string, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = (): void => {
    const hasStartDate = Boolean(draft.startDate);
    const hasEndDate = Boolean(draft.endDate);
    const hasDateRange = hasStartDate || hasEndDate;

    if (hasDateRange && !hasStartDate && !hasEndDate) {
      toast.error("Please provide both start and end dates.");
      return;
    }

    if ((hasStartDate || hasEndDate) && !(hasStartDate && hasEndDate)) {
      toast.error("Please provide both start and end dates.");
      return;
    }

    if (((Number(draft.minAmount) && Number(draft.maxAmount)) && Number(draft.minAmount) > Number(draft.maxAmount))) {
      toast.error("Minimum amount cannot be greater than maximum amount.");
      return;
    }

    setPaymentMethod(draft.paymentMethod);
    setMinAmount(draft.minAmount);
    setMaxAmount(draft.maxAmount);
    setStartDate(draft.startDate);
    setEndDate(draft.endDate);
  };

  const resetFilters = () => {
    const empty: DraftFilters = {
      paymentMethod: "",
      minAmount: "",
      maxAmount: "",
      startDate: "",
      endDate: "",
    };

    setDraft(empty);
    setPaymentMethod("");
    setMinAmount("");
    setMaxAmount("");
    setStartDate("");
    setEndDate("");
  };

  return { toggleLast90Days, dateSearchMode, handleChange, applyFilters, resetFilters, draft }
}

export default useRangeAndDateFilters;
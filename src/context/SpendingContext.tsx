import { createContext, useContext, useState } from "react";
import type { ContextProps, DateSearchMode, Month, PaymentMethod, SortValue, Spending, SpendingContextValue } from "../types/types";

const SpendingContext = createContext<SpendingContextValue | undefined>(undefined);

export const SpendingProvider = ({ children }: ContextProps) => {
  const currentYear: number = new Date().getFullYear();
  const years: number[] = [
    currentYear,
    currentYear - 1,
    currentYear - 2,
  ];
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const months: Month[] = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
  ];
  const [month, setMonth] = useState<Month>(months[new Date().getMonth()]);

  const [dateSearchMode, setDateSearchMode] = useState<DateSearchMode>("customRange");
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const [selectedSort, setSelectedSort] = useState<SortValue>("NEWEST");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">("");
  const [minAmount, setMinAmount] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("");

  const [pageSize, setPageSize] = useState<number>(10);

  const [spendings, setSpendings] = useState<Spending[]>([]);

  const contextValue: SpendingContextValue = {
    dateSearchMode,
    setDateSearchMode,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    paymentMethod,
    setPaymentMethod,
    minAmount,
    setMinAmount,
    maxAmount,
    setMaxAmount,
    spendings,
    setSpendings,
    months,
    years,
    month,
    year,
    setMonth,
    setYear,
    selectedSort,
    setSelectedSort,
    pageSize,
    setPageSize
  };

  return (
    <SpendingContext.Provider value={contextValue}>
      {children}
    </SpendingContext.Provider>
  );
};

export const useSpendingContext = () => {
  const context = useContext(SpendingContext);

  if (context === undefined) {
    throw new Error(
      "useSpendingContext must be used inside SpendingProvider"
    );
  }

  return context;
};
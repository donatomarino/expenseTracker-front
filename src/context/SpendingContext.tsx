import { createContext, useContext, useState } from "react";
import type { ContextProps, DateSearchMode, Month, SortValue, Spending, SpendingContextValue } from "../types/types";

/* TODO:
- Centralizar todos los filtros dentro del contexto
- Centralizar las llamadas a la API dentro del hook useSpending y reindirizar cada vez que cambia algún parametro
**/
const SpendingContext = createContext<SpendingContextValue | undefined>(undefined);

export const SpendingProvider = ({ children }: ContextProps) => {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [pageSize, setPageSize] = useState<number>(10);
  // const [totalElements, setTotalElements] = useState<number>(0);
  // const [totalPages, setTotalPages] = useState<number>(0);

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

  const [pageSize, setPageSize] = useState<number>(10);

  const [spendings, setSpendings] = useState<Spending[]>([]);

  const contextValue: SpendingContextValue = {
    // currentPage,
    // setCurrentPage,
    // pageSize,
    // setPageSize,
    // totalElements,
    // setTotalElements,
    // totalPages,
    // setTotalPages,
    dateSearchMode,
    setDateSearchMode,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
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
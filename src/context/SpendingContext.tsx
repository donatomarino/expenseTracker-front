import { createContext, useContext, useState } from "react";
import type { ContextProps, Month, SpendingContextValue } from "../types/types";

/* TODO:
- Centralizar todos los filtros dentro del contexto
- Centralizar las llamadas a la API dentro del hook useSpending y reindirizar cada vez que cambia algún parametro
**/
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

  const contextValue: SpendingContextValue = {
    months,
    years,
    month,
    year,
    setMonth,
    setYear,
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
import { useContext, useEffect, useState } from "react"
import { LoadingContext } from "../../../context/LoadingContext";
import type { PaymentMethod, Spending, SpendingResponse } from "../../../types/types";
import contentService from "../services/contentService";
import { useSpendingContext } from "../../../context/SpendingContext";

export const useSpending = () => {
  const { loadButton, disabledButton, reload, triggerReload } = useContext(LoadingContext);
  const { year, months, month } = useSpendingContext();

  const [spendings, setSpendings] = useState<Spending[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const paymentBadgeClasses: Record<PaymentMethod, string> = {
    CREDIT_CARD: "text-bg-primary",
    DEBIT_CARD: "text-bg-info",
    CASH: "text-bg-success",
    TRANSFER: "text-bg-warning",
  };

  const paymentMethodLabels: Record<PaymentMethod, string> = {
    CREDIT_CARD: "Credit Card",
    DEBIT_CARD: "Debit Card",
    CASH: "Cash",
    TRANSFER: "Transfer",
  };

  const getPaymentBadgeClass = (
    paymentMethod: PaymentMethod
  ): string => {
    return paymentBadgeClasses[paymentMethod];
  };

  const formatPaymentMethod = (
    paymentMethod: PaymentMethod
  ): string => {
    return paymentMethodLabels[paymentMethod];
  };

  // Load spendings
  useEffect(() => {
    const fetchs = async () => {
      /**
       * TODO:
       * Añadir el componente de loading mientras hace la petición a la base de datos.
       */
      try {
        const monthIndex = months.indexOf(month) + 1;
        const res: SpendingResponse = await contentService.getSpending({
          month: monthIndex,
          year,
        });

        setSpendings(res.spendings ?? []);
        setCurrentPage(res.page);
        setPageSize(res.size);
        setTotalElements(res.totalElements);
        setTotalPages(res.totalPages)
      } catch (e: any) {
        console.error("Error loading spendings: ", e);
      }
    };
    fetchs();
  }, [reload]);

  return { spendings, currentPage, pageSize, totalElements, totalPages, getPaymentBadgeClass, formatPaymentMethod };
};
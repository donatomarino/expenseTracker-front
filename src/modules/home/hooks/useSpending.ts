import { useContext, useEffect, useState } from "react"
import { LoadingContext } from "../../../context/LoadingContext";
import type { PaymentMethod, SpendingRequest, SpendingResponse, SpendingStatistics } from "../../../types/types";
import contentService from "../services/contentService";
import { useSpendingContext } from "../../../context/SpendingContext";

export const useSpending = () => {
  const { loadButton, disabledButton, reload, triggerReload } = useContext(LoadingContext);
  const { year, months, month, spendings, setSpendings, setDateSearchMode, dateSearchMode } = useSpendingContext();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [first, setFirst] = useState<boolean>(false);
  const [last, setLast] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<SpendingStatistics>({
    totalSpent: 0,
    totalTransactions: 0,
    average: 0
  });

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

  const formatDate = (date: Date): string => {
    return date.toISOString().slice(0, 10);
  }

  // Load spendings
  useEffect(() => {
    const fetchs = async () => {
      /**
       * TODO:
       * Añadir el componente de loading mientras hace la petición a la base de datos.
       */
      try {
        dateSearchMode === "last90Days" && setDateSearchMode("customRange");

        const monthIndex = months.indexOf(month) + 1;

        const params: SpendingRequest = ({
          month: monthIndex,
          year
        });
        const res: SpendingResponse = await contentService.getSpending(params);

        applySpendingResponse(res);
      } catch (e: any) {
        console.error("Error loading spendings: ", e);
      }
    };
    fetchs();
  }, [reload, year, month]);

  // Api request
  const apiRequest = async (params: SpendingRequest): Promise<SpendingResponse> => {
    return await contentService.getSpending(params);
  }

  // Saca los gastos de los últimos 90 días
  const getLast90Days = async (): Promise<void> => {
    try {
      if (setDateSearchMode)
        setDateSearchMode("last90Days");
      const endDate: Date = new Date();
      const startDate: Date = new Date();
      console.log(formatDate(endDate));
      startDate.setDate(startDate.getDate() - 90);

      const params: SpendingRequest = ({
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      })

      const res: SpendingResponse = await apiRequest(params);
      console.log(res)

      applySpendingResponse(res);
    } catch (e: any) {
      console.error("Error loading spendings from the last 90 days:", e);
    }
  }

  const changePage = async (page: number): Promise<void> => {
    if (page < 1 || page > totalPages) {
      return;
    }

    try {
      const params: SpendingRequest = {
        page: page - 1,
        size: pageSize
      };

      const res: SpendingResponse = await apiRequest(params);

      applySpendingResponse(res);
    } catch (e: any) {
      console.error("Error loading spendings", e);
    }
  }

  // Setter response api request
  const applySpendingResponse = (res: SpendingResponse): void => {
    setSpendings(res.spendings ?? []);
    setCurrentPage(res.page);
    setPageSize(res.size);
    setTotalElements(res.totalElements);
    setTotalPages(res.totalPages);
    setFirst(res.first);
    setLast(res.last);
    setStatistics({
      totalSpent: res.statistics.totalSpent,
      totalTransactions: res.statistics.totalTransactions,
      average: res.statistics.average
    });
  }

  return { spendings, currentPage, pageSize, totalElements, totalPages, getPaymentBadgeClass, formatPaymentMethod, getLast90Days, changePage, first, last, statistics };
};
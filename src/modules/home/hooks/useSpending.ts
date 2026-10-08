import { useContext, useEffect, useState } from "react"
import { LoadingContext } from "../../../context/LoadingContext";
import type { PaymentMethod, SpendingRequest, GetSpendingResponse, SpendingStatistics } from "../../../types/types";
import contentService from "../services/contentService";
import { useSpendingContext } from "../../../context/SpendingContext";

export const useSpending = () => {
  const { reload } = useContext(LoadingContext);
  const { year, months, month, spendings, setSpendings, setDateSearchMode, dateSearchMode, startDate, endDate } = useSpendingContext();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [first, setFirst] = useState<boolean>(false);
  const [last, setLast] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
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

  const buildSpendingParams = (page = 0, size = pageSize): SpendingRequest => {
    const baseParams: SpendingRequest = {
      page,
      size,
    };

    if(search) {
      baseParams.search = search;
    }

    if (dateSearchMode === "last90Days") {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 90);

      return {
        ...baseParams,
        startDate: formatDate(start),
        endDate: formatDate(end),
      };
    }

    if (startDate && endDate) {
      return {
        ...baseParams,
        startDate,
        endDate,
      };
    }

    const monthIndex = months.indexOf(month) + 1;

    return {
      ...baseParams,
      month: monthIndex,
      year,
    };
  };

  // Load spendings
  useEffect(() => {
    const fetchs = async () => {
      /**
       * TODO:
       * Añadir el componente de loading mientras hace la petición a la base de datos.
       */
      try {
        const params = buildSpendingParams();
        const res: GetSpendingResponse = await contentService.getSpending(params);

        applySpendingResponse(res, 1);
      } catch (e: any) {
        console.error("Error loading spendings: ", e);
      }
    };
    fetchs();
  }, [reload, year, month, dateSearchMode, startDate, endDate, search]);

  // Api request
  const apiRequest = async (params: SpendingRequest): Promise<GetSpendingResponse> => {
    return await contentService.getSpending(params);
  }

  // Toggle last 90 days mode
  const toggleLast90Days = (): void => {
    setDateSearchMode((currentMode: string) => 
    currentMode === "last90Days" ? "customRange" : "last90Days");
  };

  // Change page
  const changePage = async (page: number): Promise<void> => {
    if (page < 1 || page > totalPages) {
      return;
    }

    try {
      const params = buildSpendingParams(page - 1, pageSize);
      const res: GetSpendingResponse = await apiRequest(params);

      applySpendingResponse(res, page);
    } catch (e: any) {
      console.error("Error loading spendings", e);
    }
  }

  // Setter response api request
  const applySpendingResponse = (res: GetSpendingResponse, pageNumber = 1): void => {
    setSpendings(res.spendings ?? []);
    setCurrentPage(pageNumber);
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

  return { spendings, currentPage, pageSize, totalElements, totalPages, getPaymentBadgeClass, formatPaymentMethod, toggleLast90Days, changePage, first, last, statistics, search, setSearch };
};
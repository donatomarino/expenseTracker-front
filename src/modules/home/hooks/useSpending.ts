import { useContext, useEffect, useState } from "react"
import { LoadingContext } from "../../../context/LoadingContext";
import type { PaymentMethod, SpendingRequest, GetSpendingResponse, SpendingStatistics, Spending } from "../../../types/types";
import contentService from "../services/contentService";
import { useSpendingContext } from "../../../context/SpendingContext";
import { toast } from "react-toastify";
import { useLoad } from "../../common/hooks/useLoad";
import useFormErrors from "./useFormErrors";

export const useSpending = () => {
  const { reload, disabledButton, triggerReload, loadButton } = useContext(LoadingContext);
  const { year, months, month, spendings, setSpendings, setDateSearchMode, dateSearchMode, startDate, endDate, selectedSort, pageSize, setPageSize } = useSpendingContext();

  // State for editing spending
  const [editSpending, setEditSpending] = useState<Spending | null>(null);
  const [selectedSpending, setSelectedSpending] = useState<Spending | null>(null);

  // State for selected spending ID
  const [selectedSpendingId, setSelectedSpendingId] = useState<number | null>(null);

  // Spinner loader
  const { loading, startLoading, stopLoading } = useLoad();

  // Form errors
  const { errors, setErrors, clearErrors } = useFormErrors();

  // Pagination and search state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [first, setFirst] = useState<boolean>(false);
  const [last, setLast] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  // Statistics
  const [statistics, setStatistics] = useState<SpendingStatistics>({
    totalSpent: 0,
    totalTransactions: 0,
    average: 0
  });

  // Payment method mappings
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

  // Payment method formatters
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

  // Format spending date for UI display
  const formatDate = (date: string): string => {
    const today = new Date();
    const spendingDate = new Date(date);

    const msPerDay = 24 * 60 * 60 * 1000;
    const daysAgo = Math.floor((today.getTime() - spendingDate.getTime()) / msPerDay);

    if (daysAgo < 7) {
      if (daysAgo === 0) return "Today";
      if (daysAgo === 1) return "1 day ago";
      return `${daysAgo} days ago`;
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  // Builds query params for the spending request
  const buildSpendingParams = (page = 0, size = pageSize): SpendingRequest => {
    const baseParams: SpendingRequest = {
      page,
      size,
    };

    if (search) {
      baseParams.search = search;
    }

    if (selectedSort) {
      baseParams.sort = selectedSort;
    }

    if (dateSearchMode === "last90Days") {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 90);

      return {
        ...baseParams,
        startDate: formatDateForRequest(start),
        endDate: formatDateForRequest(end),
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

  // Formats dates as YYYY-MM-DD for API requests
  const formatDateForRequest = (date: Date): string => {
    return date.toISOString().slice(0, 10);
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
  }, [reload, year, month, dateSearchMode, startDate, endDate, search, selectedSort, pageSize]);

  // Api request
  const apiRequest = async (params: SpendingRequest): Promise<GetSpendingResponse> => {
    return await contentService.getSpending(params);
  }

  // Toggle last 90 days mode
  const toggleLast90Days = (): void => {
    setDateSearchMode((currentMode: string) =>
      currentMode === "last90Days" ? "customRange" : "last90Days");
  };

  // Edit spending
  const startEditing = (spending: Spending, openEditModal: () => void) => {
    if (spending.id !== undefined && spending.id !== null) {

      setSelectedSpending(spending);
      setEditSpending(spending);

      openEditModal();
    } else {
      console.error("Invalid spending selected for editing");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    if (!editSpending) return;

    setEditSpending({
      ...editSpending,
      [e.target.name]: e.target.value
    });
  }

  const handleEdit = async (e: React.SubmitEvent<HTMLFormElement>, closeModal: () => void): Promise<void> => {
    e.preventDefault();
    disabledButton();

    if (!editSpending || !selectedSpending) {
      toast.error("Server error");
      disabledButton();
      return;
    }

    const noChanges =
      editSpending.description === selectedSpending?.description &&
      editSpending.amount === selectedSpending?.amount &&
      editSpending.date === selectedSpending?.date &&
      editSpending.paymentMethod === selectedSpending?.paymentMethod;

    if (noChanges) {
      toast.error('You have to modify at least one field');
      disabledButton();
      return;
    }

    startLoading();
    try {
      // Normalize the amount before sending it to the backend
      const payload = {
        ...editSpending,
        amount: Number(editSpending.amount.toString().replace(",", "."))
      };
      
      // Call the service to edit spending
      await contentService.editSpending(payload);

      toast.success('Spending updated successfully');
      closeModal();
      triggerReload();
      clearErrors();

    } catch (e: any) {
      if (e.response && e.response.status === 400) {
        const errors = e.response.data;

        setErrors(errors);
      } else {
        console.error("The request failed: ", e);
        toast.error("Server error");
      }
    } finally {
      disabledButton();
      stopLoading();
    }
  }

  // Delete spending
  const handleDelete = (id: number, openModal: () => void): void => {
    setSelectedSpendingId(id);
    openModal();
  }

  const deleteSpending = async (closeModal: () => void): Promise<void> => {
    if (selectedSpendingId === null) {
      toast.error("Server error");
      return;
    }

    startLoading();
    try {
      await toast.promise(
        contentService.deleteSpending(selectedSpendingId),
        {
          pending: "Deleting spending...",
          success: "Spending deleted successfully",
          error: "Error deleting spending",
        }
      );

      closeModal();
      triggerReload();
    } catch (e) {
      console.error('Server error', e);
    } finally {
      stopLoading();
    }
  }

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

  return { spendings, currentPage, pageSize, setPageSize, totalElements, totalPages, getPaymentBadgeClass, formatPaymentMethod, toggleLast90Days, changePage, first, last, statistics, search, setSearch, startEditing, handleChange, handleEdit, errors, clearErrors, selectedSpending, loading, loadButton, editSpending, handleDelete, deleteSpending, formatDate };
};
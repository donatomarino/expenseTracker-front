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
  const { year, months, month, spendings, setSpendings, setDateSearchMode, dateSearchMode, startDate, endDate, selectedSort } = useSpendingContext();

  // State for editing spending
  const [editSpending, setEditSpending] = useState<Spending | null>(null);
  const [selectedSpending, setSelectedSpending] = useState<Spending | null>(null);

  // State for selected spending ID
  const [selectedSpendingId, setSelectedSpendingId] = useState<number | null>(null);

  // Spinner loader
  const { loading, startLoading, stopLoading } = useLoad();

  // Form errors
  const { errors, setErrors, clearErrors } = useFormErrors();

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

    if (search) {
      baseParams.search = search;
    }

    if(selectedSort) {
      baseParams.sort = selectedSort;
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
  }, [reload, year, month, dateSearchMode, startDate, endDate, search, selectedSort]);

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
      // Call the service to edit spending
      await contentService.editSpending(editSpending);

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

  // Delete
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

  return { spendings, currentPage, pageSize, totalElements, totalPages, getPaymentBadgeClass, formatPaymentMethod, toggleLast90Days, changePage, first, last, statistics, search, setSearch, startEditing, handleChange, handleEdit, errors, selectedSpending, loading, loadButton, editSpending, handleDelete, deleteSpending };
};
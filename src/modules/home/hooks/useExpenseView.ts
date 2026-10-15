import { useModal } from "./useModal";
import { useSpending } from "./useSpending";
import type { SpendingFormIdAndPlaceHolder, SpendingFormValues, UseExpenseViewReturn } from "../../../types/types";

export const useExpenseView = (): UseExpenseViewReturn => {
  const {
    spendings,
    totalElements,
    pageSize,
    setPageSize,
    totalPages,
    currentPage,
    getPaymentBadgeClass,
    formatPaymentMethod,
    changePage,
    first,
    last,
    startEditing,
    errors,
    clearErrors,
    handleChange,
    handleEdit,
    selectedSpending,
    loading,
    loadButton,
    editSpending,
    deleteSpending,
    handleDelete,
    formatDate,
  } = useSpending();

  const {
    openEditModal,
    editModalIsOpen,
    closeEditModal,
    customStyles,
    modalIsOpen,
    closeModal,
    openModal,
  } = useModal();

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextSize = Number(e.target.value);
    setPageSize(nextSize);
  };

  const formValues: SpendingFormValues = {
    description: editSpending?.description ?? selectedSpending?.description ?? "",
    amount: editSpending?.amount ? String(editSpending.amount) : "",
    paymentMethod:
      editSpending?.paymentMethod ??
      selectedSpending?.paymentMethod ??
      "CREDIT_CARD",
    date: editSpending?.date ?? selectedSpending?.date ?? "",
  };

  const formIds: SpendingFormIdAndPlaceHolder = {
    description: "editSpendingDescription",
    amount: "editSpendingAmount",
    paymentMethod: "editSpendingPaymentMethod",
    date: "editSpendingDate",
  };

  const formPlaceHolders: SpendingFormIdAndPlaceHolder = {
    description: selectedSpending?.description ?? "",
    amount: selectedSpending?.amount?.toString() ?? "",
    paymentMethod: editSpending?.paymentMethod || "",
    date: selectedSpending?.date ?? "",
  };

  const handleCloseEditModal = () => {
    closeEditModal();
    clearErrors();
  };

  return {
    spendings,
    totalElements,
    pageSize,
    setPageSize,
    totalPages,
    currentPage,
    getPaymentBadgeClass,
    formatPaymentMethod,
    changePage,
    first,
    last,
    startEditing,
    errors,
    clearErrors,
    handleChange,
    handleEdit,
    selectedSpending,
    loading,
    loadButton,
    editSpending,
    deleteSpending,
    handleDelete,
    formatDate,
    openEditModal,
    editModalIsOpen,
    closeEditModal,
    customStyles,
    modalIsOpen,
    closeModal,
    openModal,
    handlePageSizeChange,
    formValues,
    formIds,
    formPlaceHolders,
    handleCloseEditModal,
  };
};

export default useExpenseView;

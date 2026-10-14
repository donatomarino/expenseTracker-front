import type { PaymentMethod } from "../../../types/types";

const usePaymentMethodUI = () => {
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

  return { getPaymentBadgeClass, formatPaymentMethod }
}

export default usePaymentMethodUI;
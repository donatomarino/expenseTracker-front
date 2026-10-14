import type { paymentMethodOption } from "../../../types/types";

export const paymentMethodOptions: paymentMethodOption[] = [
  {
    value: 'CREDIT_CARD',
    label: 'Credit Card'
  },
  {
    value: 'DEBIT_CARD',
    label: 'Debit Card'
  },
  {
    value: 'CASH',
    label: 'Cash'
  },
  {
    value: 'TRANSFER',
    label: 'Transfer'
  }
];
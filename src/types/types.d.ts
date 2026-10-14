import type { AxiosRequestConfig } from "axios";

//--------- SPENDING ----------//
interface Spending {
  id: number;
  date: string;
  description: string;
  paymentMethod: PaymentMethod;
  amount: number;
}

export type CreateSpendingRequest = Omit<Spending, "id">;

export interface SpendingFormData {
  description: string;
  date: string;
  amount: string;
  paymentMethod: PaymentMethod;
}

// interface BaseModalProps {
//   modalIsOpen: boolean;
//   closeModal: () => void;
//   customStyles: ReactModal.Styles;
//   loadButton: boolean;
//   errors: Errors;
//   loading: boolean;
// }

// export interface ModalProps extends BaseModalProps {
//   handleSubmit: (e: React.SubmitEvent<HTMLFormElement>, closeModal: () => void) => Promise<void>;
//   newSpending: CreateSpendingRequest | null;
//   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
// }

// interface EditModalProps extends BaseModalProps, BaseCardProps {
//   openEditModal: () => void;
//   editModalIsOpen: boolean;
//   closeEditModal: () => void;
// }



// export interface NewSpendingModalProps extends ModalProps {
//   setErrors: Dispatch<SetStateAction<Errors>>;
// }

// interface BaseCardProps extends BaseModalProps {
//   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
//   handleEdit: (e: React.SubmitEvent<HTMLFormElement>, closeModal: () => void) => Promise<void>;
//   selectedSpending: Spending | null;
//   editSpending: Spending | null;
// }

// export interface CardProps extends BaseModalProps, BaseCardProps, DeleteModalProps, EditModalProps {
//   spendings: spending[];
//   formatSpending: (date: string) => string;
//   loadButton: boolean;
//   openModal: () => void;
//   handleDelete: (id: number, openModal: () => void) => void;
//   startEditing: (spending: Spending, openEditModal: () => void) => void;
// }

// export interface SpendingFiltersProps {
//   minAmount: string;
//   setMinAmount: (value: string) => void;
//   maxAmount: string;
//   setMaxAmount: (value: string) => void;
//   filterByAmount: () => void;
//   restoreSpendings: () => void;
//   orderByDate: () => void;
//   orderByAmount: () => void;
//   orderByDescription: () => void;
//   setSearch: Dispatch<SetStateAction<string>>;
//   startDate: string;
//   setStartDate: Dispatch<SetStateAction<string>>;
//   endDate: string;
//   setEndDate: Dispatch<SetStateAction<string>>;
//   filterByDateRange: () => void;
// }



//--------- INTERFACES TABLE ----------//
export interface FormFieldProps {
  label: string;
  type: string;
  id: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name: string;
  disabled: boolean;
  error?: string | string[];
}

export interface ExpenseRowProps {
  spending: Spending;
  formatDate: (date: string) => string;
  getPaymentBadgeClass: (paymentMethod: PaymentMethod) => string;
  formatPaymentMethod: (paymentMethod: PaymentMethod) => string;
  startEditing: (spending: Spending, openEditModal: () => void) => void;
  openEditModal: () => void;
  openModal: () => void;
  handleDelete: (id: number, openModal: () => void) => void;
}

export interface PaginationProps {
  changePage: (page: number) => void;
  currentPage: number;
  first: boolean;
  last: boolean;
  totalPages: number;
}

export interface PageSizeSelectorProps {
  pageSize: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface SearchInputProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export interface SortDropdownProps {
  selectedSort: SortValue;
  setSelectedSort: Dispatch<SetStateAction<SortValue>>;
  selectedSortLabel: string;
}



//--------- MODAL PROPS  ----------//
type SpendingModalMode = 'new' | 'edit';

interface SpendingFormValues {
  description?: string;
  amount?: string;
  paymentMethod: PaymentMethod,
  date?: string;
}

interface SpendingFormIdAndPlaceHolder {
  description: string;
  amount: string;
  paymentMethod?: string;
  date?: string;
}

export interface HeaderModalProps {
  mode?: SpendingModalMode;
  loadButton: boolean;
  onClose: () => void;
}

export interface PaymentMethodFieldProps {
  htmlFor: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled: boolean;
}

export interface SpendingModalProps extends HeaderModalProps, BaseModalProps {
  formValues?: SpendingFormValues;
  formIds: SpendingFormIdAndPlaceHolder;
  formPlaceHolders: SpendingFormIdAndPlaceHolder;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>, closeModal: () => void) => Promise<void>;
}

export interface DeleteModalProps extends BaseModalProps, HeaderModalProps {
  deleteSpending: (closeModal: () => void) => Promise<void>;
}

interface BaseModalProps {
  isOpen: boolean,
  customStyles: ReactModal.Styles;
  loading: boolean;
  errors: Errors;
}



//--------- Interfaces for context ----------//
export interface LoadingContextValue {
  loadButton: boolean;
  disabledButton: () => void;
  reload: boolean;
  triggerReload: () => void;
}

export interface SpendingContextValue {
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  spendings: Spending[];
  setSpendings: Dispatch<SetStateAction<Spending>>;
  dateSearchMode: DateSearchMode;
  startDate: string;
  endDate: string;
  setDateSearchMode: Dispatch<SetStateAction<DateSearchMode>>;
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
  months: Month[];
  years: number[];
  month: Month;
  setMonth: Dispatch<SetStateAction<Month>>;
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
  selectedSort: SortValue;
  setSelectedSort: Dispatch<SetStateAction<SortValue>>;
}

export interface ContextProps {
  children: React.ReactNode;
}



//--------- Interfaces for API ----------//
export type Service = "api" | "auth";

export interface RequestParams {
  url: string;
  data?: object;
  params?: SpendingRequest;
  service?: Service;
}

export interface LoginPayload {
  email: string;
  password: string;
  showPassword?: boolean;
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_name: string;
}

export interface RegisterResponse {
  message: String;
  success: boolean;
}

export interface SpendingRequest {
  year?: number;
  month?: number;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  search?: string;
  sort?: SpendingSort;
  paymentMethod?: PaymentMethod;
  page?: number;
  size?: number;
}

export interface GetSpendingResponse {
  spendings: Spending[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  statistics: SpendingStatistics;
}

export interface SpendingStatistics {
  totalSpent: number;
  totalTransactions: number;
  average: number;
}

export interface Errors {
  description?: string;
  amount?: string;
  date?: string;
}

export interface FieldErrorProps {
  error?: string | string[];
}

export interface RegisterErrors {
  fullName?: string | string[];
  email?: string | string[];
  password?: string | string[];
}



// --------- TYPES BUTTONS ---------- //
export type CloseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export type ButtonVariant = "primary" | "outlinePrimary" | "secondary" | "danger" | "outlineDanger" | "light";
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};



// --------- TYPES SPENDINGS BY YEAR AND MONTH ---------- //
export type Month = "january" | "february" | "march" | "april" | "may" | "june" | "july" | "august" | "september" | "october" | "november" | "december";



// --------- TYPES/INTERFACES DASHBOARD ---------- //
export type PaymentMethod = "CASH" | "DEBIT_CARD" | "CREDIT_CARD" | "TRANSFER";
export type SortValue = "OLDEST" | "NEWEST" | "AMOUNT_LOW_TO_HIGH" | "AMOUNT_HIGH_TO_LOW" | "DESCRIPTION";

export type SortOption = {
  value: SortValue;
  label: string;
}

export type paymentMethodOption = {
  value: PaymentMethod;
  label: string;
}
export type DateSearchMode = "last90Days" | "customRange";



//--------- INTERFACES HOOKS ----------//
export interface UseExpenseControlsResult {
  selectedSort: SortValue;
  setSelectedSort: Dispatch<SetStateAction<SortValue>>;
  selectedSortOption: SortOption | undefined;
  selectedSortLabel: string;
  sortOptions: readonly SortOption[];
};



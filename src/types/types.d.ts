import type { AxiosRequestConfig } from "axios";

//--------- Components ----------//
interface Spending {
  id: number;
  spendingDate: string;
  description: string;
  paymentMethod: PaymentMethod;
  amount: number;
}

interface BaseModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  customStyles: ReactModal.Styles;
  loadButton: boolean;
  errors: Errors;
  loading: boolean;
}

export interface ModalProps extends BaseModalProps {
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>, closeModal: () => void) => Promise<void>;
  newSpending: Spending | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface EditModalProps extends BaseModalProps, BaseCardProps {
  openEditModal: () => void;
  editModalIsOpen: boolean;
  closeEditModal: () => void;
}

export interface DeleteModalProps extends BaseModalProps {
  deleteSpending: (closeModal: () => void) => Promise<void>;
}

export interface NewSpendingModalProps extends ModalProps {
  setErrors: Dispatch<SetStateAction<Errors>>;
}

interface BaseCardProps extends BaseModalProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEdit: (e: React.SubmitEvent<HTMLFormElement>, closeModal: () => void) => Promise<void>;
  selectedSpending: Spending | null;
}

export interface CardProps extends BaseModalProps, BaseCardProps, DeleteModalProps, EditModalProps {
  spendings: spending[];
  formatSpending: (date: string) => string;
  loadButton: boolean;
  openModal: () => void;
  handleDelete: (id: number, openModal: () => void) => void;
  startEditing: (spending: Spending, openEditModal: () => void) => void;
}

export interface SpendingFiltersProps {
  minAmount: string;
  setMinAmount: (value: string) => void;
  maxAmount: string;
  setMaxAmount: (value: string) => void;
  filterByAmount: () => void;
  restoreSpendings: () => void;
  orderByDate: () => void;
  orderByAmount: () => void;
  orderByDescription: () => void;
  setSearch: Dispatch<SetStateAction<string>>;
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
  filterByDateRange: () => void;
}

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

export interface EmptyStateProps {
  title: string;
  description: string;
}

//--------- Interfaces for context ----------//
export interface LoadingContextValue {
  loadButton: boolean;
  disabledButton: () => void;
  reload: boolean;
  triggerReload: () => void;
}

export interface SpendingContextValue {
  months: Month[];
  years: number[];
  month: Month;
  setMonth: Dispatch<SetStateAction<Month>>;
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
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

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_name: string;
}

export interface RegisterResponse {
  message: String;
  success:boolean;
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

export interface SpendingResponse {
  spendings: Spending[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean
}


/** */

export interface BaseApiResponse {
  success: boolean;
  message: string;
  error?: boolean;
}

export interface Requests<T> extends BaseApiResponse {
  data: T;
}


export interface Errors {
  description?: string;
  amount?: string;
  date?: string;
}

export interface FieldErrorProps {
  error?: string | string[];
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
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
// export type YearMonthKey = string;

// export type SpendingsByMonth = Record<YearMonthKey, Spending[]>;


// --------- TYPES/INTERFACES DASHBOARD ---------- //
export type PaymentMethod = "CASH" | "DEBIT_CARD" | "CREDIT_CARD" | "TRANSFER";
export type SortValue = "OLDEST" | "NEWEST" | "AMOUNT_LOW_TO_HIGH" | "AMOUNT_HIGH_TO_LOW" | "DESCRIPTION"; 

export type SortOption = {
  value: SortValue;
  label: string;
}

export interface UseExpenseControlsResult {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  selectedSort: SortValue;
  setSelectedSort: Dispatch<SetStateAction<SortValue>>;
  selectedSortOption: SortOption | undefined;
  selectedSortLabel: string;
  handleRestore: () => void;
  sortOptions: readonly SortOption[];
};



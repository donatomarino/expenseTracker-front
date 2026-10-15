import type { AxiosRequestConfig } from "axios";
import type { SetStateAction } from "react";

//--------- SPENDING ----------//
export interface Spending {
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



//--------- INTERFACES TABLE ----------//
export interface FormFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange" | "value"
> {
  label: string;
  type: React.HTMLInputTypeAttribute;
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

export interface UseExpenseViewReturn {
  spendings: Spending[];
  totalElements: number;
  pageSize: number;
  setPageSize: (value: number) => void;
  totalPages: number;
  currentPage: number;
  getPaymentBadgeClass: ReturnType<typeof useSpending>["getPaymentBadgeClass"];
  formatPaymentMethod: ReturnType<typeof useSpending>["formatPaymentMethod"];
  changePage: (page: number) => void;
  first: boolean;
  last: boolean;
  startEditing: ReturnType<typeof useSpending>["startEditing"];
  errors: ReturnType<typeof useSpending>["errors"];
  clearErrors: () => void;
  handleChange: ReturnType<typeof useSpending>["handleChange"];
  handleEdit: ReturnType<typeof useSpending>["handleEdit"];
  selectedSpending: ReturnType<typeof useSpending>["selectedSpending"];
  loading: boolean;
  loadButton: boolean;
  editSpending: ReturnType<typeof useSpending>["editSpending"];
  deleteSpending: ReturnType<typeof useSpending>["deleteSpending"];
  handleDelete: ReturnType<typeof useSpending>["handleDelete"];
  formatDate: (date: string) => string;
  openEditModal: () => void;
  editModalIsOpen: boolean;
  closeEditModal: () => void;
  customStyles: ReturnType<typeof useModal>["customStyles"];
  modalIsOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  handlePageSizeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  formValues: SpendingFormValues;
  formIds: SpendingFormIdAndPlaceHolder;
  formPlaceHolders: SpendingFormIdAndPlaceHolder;
  handleCloseEditModal: () => void;
};

export interface CardProps {
  spendings: Spending[];
  formatDate: (date: string) => string;
  getPaymentBadgeClass: (paymentMethod: PaymentMethod) => string;
  formatPaymentMethod: (paymentMethod: PaymentMethod) => string;
  startEditing: (spending: Spending, openEditModal: () => void) => void;
  openEditModal: () => void;
  handleDelete: (id: number, openModal: () => void) => void;
  openModal: () => void;
};

export interface ExpenseTableMobileHeaderProps {
  totalElements: number;
  pageSize: number;
  handlePageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface ExpenseTableMobileFooterProps {
  currentPage: number;
  totalPages: number;
  spendings: any[];
  totalElements: number;
  changePage: (page: number) => void;
  first: boolean;
  last: boolean;
}

export interface ExpenseActionsProps {
  spending: Spending;
  onEdit: (spending: Spending, openEditModal: () => void) => void;
  onDelete: (id: number, openModal: () => void) => void;
  openEditModal: () => void;
  openModal: () => void;
  containerClassName?: string;
  editButtonClassName?: string;
  deleteButtonClassName?: string;
};

export interface EmptyStateProps {
  loading: boolean;
  variant?: "table" | "card";
};



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

export type UseRangeAndDateFiltersReturn = {
  toggleLast90Days: () => void;
  dateSearchMode: DateSearchMode;
  handleChange: (field: string, value: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  draft: DraftFilters;
};

export type RangeProps = {
  dateSearchMode: DateSearchMode;
  toggleLast90Days: () => void;
}

export type DraftFilters = {
  paymentMethod: string | PaymentMethod;
  minAmount: string;
  maxAmount: string;
  startDate: string;
  endDate: string;
}

export type FiltersProps = {
  draft: DraftFilters;
  handleChange: (field: string, value: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}



//--------- INTERFACES HOOKS / CONTEXT ----------//
export interface LoadingContextValue {
  loadButton: boolean;
  disabledButton: () => void;
  reload: boolean;
  triggerReload: () => void;
}

interface SpendingFiltersState {
  year: number;
  month: Month;
  months: Month[];
  dateSearchMode: DateSearchMode;
  startDate: string;
  endDate: string;
  paymentMethod: PaymentMethod | "";
  minAmount: string;
  maxAmount: string;
  selectedSort: SortValue;
  pageSize: number;
  setSpendings: Dispatch<SetStateAction<Spending[]>>;
  setPageSize: Dispatch<SetStateAction<number>>;
}

export interface SpendingContextValue extends SpendingFiltersState {
  setDateSearchMode: Dispatch<SetStateAction<DateSearchMode>>;
  paymentMethod: PaymentMethod | "";
  setPaymentMethod: Dispatch<SetStateAction<PaymentMethod | "">>;
  minAmount: string;
  setMinAmount: Dispatch<SetStateAction<string>>;
  maxAmount: string;
  setMaxAmount: Dispatch<SetStateAction<string>>;
  spendings: Spending[];
  years: number[];
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
  setMonth: Dispatch<SetStateAction<Month>>;
  setYear: Dispatch<SetStateAction<number>>;
  setSelectedSort: Dispatch<SetStateAction<SortValue>>;
}

export interface ContextProps {
  children: React.ReactNode;
}

export interface UseExpenseControlsResult {
  setSelectedSort: Dispatch<SetStateAction<SortValue>>;
  selectedSortOption: SortOption | undefined;
  selectedSortLabel: string;
  sortOptions: readonly SortOption[];
  selectedSort: SortValue;
};

export interface UseCreateSpendingParams {
  newSpending: SpendingFormData;
  resetNewSpending: () => void;
  closeModal: () => void;
};

export interface UseSpendingEditParams extends UseSpendingDeleteParams {
  disabledButton: () => void;
  setErrors: React.Dispatch<React.SetStateAction<Errors>>,
  clearErrors: () => void;
}

export interface UseSpendingDeleteParams {
  startLoading: () => void;
  triggerReload?: () => void;
  stopLoading: () => void;
}

export interface UseSpendingListParams extends SpendingFiltersState, UseSpendingDeleteParams {
  reload: boolean,
  search: string;
  formatDateForRequest: (date: Date) => string;
}

export interface BaseFormState {
  errors: Errors;
  clearErrors: () => void;
  loading: boolean;
}

export interface BaseModalState {
  modalIsOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  customStyles: ReactModal.Styles;
  headerWrapperStyle: CSSProperties;
}

export interface UseCreateSpendingResult extends BaseFormState {
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
}

export interface UseHeaderResult extends BaseFormState, BaseModalState {
  newSpending: SpendingFormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement, Element>) => void;
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
  resetNewSpending: () => void;
  handleCloseNewModal: () => void;
  handleLogout: () => void;
  loadButton: boolean
}

export interface UseModalResult extends BaseModalState {
  deleteModalIsOpen: boolean;
  editModalIsOpen: boolean;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
  openEditModal: () => void;
  closeEditModal: () => void;
}

export interface UseSpendingResult {
  spendings: Spending[];
  currentPage: number;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  totalElements: number;
  totalPages: number;
  getPaymentBadgeClass: (paymentMethod: PaymentMethod) => string;
  formatPaymentMethod: (paymentMethod: PaymentMethod) => string;
  toggleLast90Days: () => void;
  changePage: (page: number) => Promise<void>;
  first: boolean;
  last: boolean;
  statistics: SpendingStatistics;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  startEditing: (spending: Spending, openEditModal: () => void) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleEdit: (e: React.SubmitEvent<HTMLFormElement>, closeModal: () => void) => Promise<void>;
  errors: Errors;
  clearErrors: () => void;
  selectedSpending: Spending | null;
  loading: boolean;
  loadButton: boolean;
  editSpending: Spending | null;
  handleDelete: (id: number, openModal: () => void) => void;
  deleteSpending: (closeModal: () => void) => Promise<void>;
  formatDate: (date: string) => string;
}
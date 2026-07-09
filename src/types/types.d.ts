//--------- Interfaces for components ----------//
export interface Spending {
  id?: number;
  description: string;
  amount: number;
  date: string;
}

interface BaseModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  customStyles: ReactModal.Styles;
  loadButton: boolean;
  errors: Errors;
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

//--------- Interfaces for context ----------//
export interface LoadingContextType {
  loadButton: boolean;
  disabledButton: () => void;
  reload: boolean;
  triggerReload: () => void;
}

export interface LoadingProviderProps {
  children: React.ReactNode;
}

//--------- Interfaces for API ----------//
export interface RequestParams {
  url: string;
  data?: object;
  params?: Record<string, string | number | boolean>;
}

export interface LoginPayload {
  email: string;
  password: string;
  showPassword?: boolean;
}

export interface BaseApiResponse {
  success: boolean;
  message: string;
  error?: boolean;
}

export interface Requests<T> extends BaseApiResponse {
  data: T;
}

export interface AuthResponse extends BaseApiResponse {
  access_token: string;
  token_type: string;
  user_name: string;
}

export interface Errors {
  description?: string;
  amount?: string;
  date?: string;
}

export interface FieldErrorProps {
  error?: string;
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormFieldProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
  disabled: boolean;
  error?: string;
}

export interface RegisterErrors {
  full_name?: string; 
  email?: string;
  password?: string;
}
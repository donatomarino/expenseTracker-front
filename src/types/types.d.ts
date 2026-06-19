//--------- Interfaces for components ----------//
export interface Spending {
  id?: number;
  description: string;
  amount: number;
  date: string;
}

export interface BaseModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  customStyles: ReactModal.Styles;
  context: LoadButtonContextType;
}

export interface CardProps extends BaseModalProps, DeleteModalProps {
  spendings: spending[];
  formatSpending: (date: string) => string;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  handleDelete: (id: number, openModal: () => void) => void;
  openModal: () => void;
}

export interface ModalProps extends BaseModalProps {
  handleSubmit: React.SubmitEventHandler<HTMLFormElement>;
  newSpending: Spending;
  handleChange: ChangeEvent<HTMLInputElement>;
}

export interface DeleteModalProps extends BaseModalProps {
  deleteSpending: (closeModal: () => void) => void;
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
export interface LoadButtonContextType {
  loadButton: boolean;
  disabledButton: () => void;
}

export interface LoadButtonProviderProps {
  children: React.ReactNode;
}
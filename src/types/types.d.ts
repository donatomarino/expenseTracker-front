//--------- Interfaces for components ----------//
export interface Spending {
  id: number;
  description: string;
  amount: number;
  date: string;
}

export interface CardProps extends ModalProps, DeleteModalProps {
  spendings: spending[];
  formatSpending: (date: string) => string;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  handleDelete: (id: number, openModal: () => void) => void;
  openModal: () => void;
}

export interface ModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  customStyles: ReactModal.Styles;
  context: LoadButtonContextType
}

export interface DeleteModalProps extends ModalProps {
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
}

//--------- Types for context ----------//
export interface LoadButtonContextType {
  loadButton: boolean;
  disabledButton: () => void;
}

export interface LoadButtonProviderProps {
  children: React.ReactNode;
}
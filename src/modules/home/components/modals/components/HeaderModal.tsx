import type { HeaderModalProps } from "../../../../../types/types";
import CloseButton from "../../../../common/components/CloseButton";

const HeaderModal = ({
  mode,
  loadButton,
  onClose
}: HeaderModalProps) => {

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 className="fw-bold mb-1 text-dark">{mode === "new" ? "Add new expense" : "Edit expense"}</h3>
        <p className="text-secondary mb-0 small">
          {mode === "new" ? "Fill in the details of your new spending" : "Update the details of your spending."}
        </p>
      </div>

      <CloseButton
        disabled={loadButton}
        onClick={onClose}
      />
    </div>
  )
}

export default HeaderModal;
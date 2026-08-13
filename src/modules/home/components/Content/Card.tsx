import Modal from "react-modal";
import type { CardProps } from "../../../../types/types";
import DeleteSpendingModal from "../modals/DeleteSpendingModal";
import EditSpendingModal from "../modals/EditSpedingModal";
import EmptyState from "../dashboard/EmptyState";
import Button from "../../../common/components/Button";

Modal.setAppElement("#root");

const Card = (props: CardProps) => {
  const {
    spendings,
    formatSpending,
    loadButton,
    errors,
    handleDelete,
    deleteSpending,
    openModal,
    openEditModal,
    modalIsOpen,
    editModalIsOpen,
    closeModal,
    closeEditModal,
    customStyles,
    startEditing,
    selectedSpending,
    handleChange,
    handleEdit,
    loading
  } = props;

  return (
    spendings.length > 0 ?
      <div className="row g-4 mt-2">
        {spendings.map((spending) => (
          <div
            key={spending.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <div className="card border-0 text-center shadow-sm rounded-4 overflow-hidden h-100">
              <div className="card-body p-4">
                <h5 className="card-title fw-bold text-dark">
                  {spending.description}
                </h5>
                <h6 className="card-subtitle mb-3 text-secondary">
                  {formatSpending(spending.date)}
                </h6>
                <p className="card-text fs-4 fw-semibold text-primary mb-4">
                  ${spending.amount.toFixed(2)}
                </p>

                <div className="d-flex justify-content-center gap-2">
                  <Button
                    variant="outlinePrimary"
                    onClick={() => startEditing(spending, openEditModal)}
                    disabled={loadButton}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlineDanger"
                    onClick={() => handleDelete(spending.id, openModal)}
                    disabled={loadButton}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <EditSpendingModal
          modalIsOpen={editModalIsOpen}
          closeModal={closeEditModal}
          customStyles={customStyles}
          loadButton={loadButton}
          errors={errors}
          handleChange={handleChange}
          handleEdit={handleEdit}
          selectedSpending={selectedSpending}
          loading={loading}
        />

        <DeleteSpendingModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          customStyles={customStyles}
          loadButton={loadButton}
          errors={errors}
          deleteSpending={deleteSpending}
          loading={loading}
        />
      </div> :
      <EmptyState
        title="No expense yet"
        description="Start by adding your first expense to keep track of your spending."
      />
  );
};

export default Card;
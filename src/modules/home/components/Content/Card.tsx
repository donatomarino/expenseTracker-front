import Modal from "react-modal";
import type { CardProps } from "../../../../types/types";
import DeleteSpendingModal from "../Modals/DeleteSpendingModal";

Modal.setAppElement("#root");

const Card = (props: CardProps) => {
  const {
    spendings,
    formatSpending,
    editingId,
    setEditingId,
    loadButton,
    errors,
    handleDelete,
    deleteSpending,
    openModal,
    modalIsOpen,
    closeModal,
    customStyles,
    startEditing,
    handleChange,
    handleEdit,
  } = props;

  return (
    <div className="row g-4 mt-2">
      {spendings.map((spending) => (
        <div
          key={spending.id}
          className="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <div className="card border-0 text-center shadow-sm rounded-4 overflow-hidden h-100">
            <div className="card-body p-4">
              {editingId === spending.id ? (
                <>
                  <div>
                    <h5 className="fw-bold mb-1 text-dark">Edit Spending</h5>
                    <p className="text-secondary mb-0 small">
                      Update the details of your spending.
                    </p>
                  </div>

                  <form
                    className="bg-white rounded-4 p-3 mt-3"
                    onSubmit={(e) => handleEdit(e, spending)}
                    method="PUT"
                  >
                    <div className="mb-3">
                      <input
                        type="text"
                        name="description"
                        className="form-control form-control-l bg-light border-0 shadow-sm"
                        aria-label="Description"
                        placeholder={spending.description}
                        onChange={handleChange}
                        disabled={loadButton}
                      />

                      <div className="mt-1 error-slot">
                        {errors?.description && (
                          <span className="text-danger">
                            {errors.description[0]}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-3">
                      <input
                        type="text"
                        name="amount"
                        className="form-control form-control-l bg-light border-0 shadow-sm"
                        aria-label="Amount"
                        placeholder={spending.amount.toFixed(2)}
                        onChange={handleChange}
                        disabled={loadButton}
                      />

                      <div className="mt-1 error-slot">
                        {errors?.amount && (
                          <span className="text-danger">
                            {errors.amount[0]}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-2">
                      <input
                        type="date"
                        name="date"
                        className="form-control form-control-l bg-light border-0 shadow-sm"
                        aria-label="Date"
                        defaultValue={spending.date}
                        onChange={handleChange}
                        disabled={loadButton}
                      />

                      <div className="mt-1 error-slot">
                        {errors?.date && (
                          <span className="text-danger">
                            {errors.date[0]}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 d-flex justify-content-center gap-2">
                      <button
                        type="submit"
                        className="btn btn-outline-primary"
                        disabled={loadButton}
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => setEditingId(null)}
                        disabled={loadButton}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
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
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => startEditing(spending)}
                      disabled={loadButton}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(spending.id, openModal)}
                      disabled={loadButton}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}

      <DeleteSpendingModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={customStyles}
        loadButton={loadButton}
        deleteSpending={deleteSpending}
      />
    </div>
  );
};

export default Card;
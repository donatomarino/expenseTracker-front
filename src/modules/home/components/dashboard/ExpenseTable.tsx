import EmptyState from "./common/EmptyState";
import { ExpenseRow } from "./table/ExpenseRow";
import { Pagination } from "./table/Pagination";
import { TableHeader } from "./table/TableHeader";
import { PageSizeSelector } from "./table/PageSizeSelector";
import { useExpenseView } from "../../hooks/useExpenseView";
import SpendingModal from "../modals/SpendingModal";
import DeleteSpendingModal from "../modals/DeleteSpendingModal";

const ExpenseTable = () => {
  const {
    spendings,
    totalElements,
    pageSize,
    totalPages,
    currentPage,
    getPaymentBadgeClass,
    formatPaymentMethod,
    changePage,
    first,
    last,
    startEditing,
    errors,
    handleChange,
    handleEdit,
    loading,
    loadButton,
    deleteSpending,
    handleDelete,
    formatDate,
    openEditModal,
    editModalIsOpen,
    customStyles,
    modalIsOpen,
    closeModal,
    openModal,
    handlePageSizeChange,
    formValues,
    formIds,
    formPlaceHolders,
    handleCloseEditModal,
  } = useExpenseView();

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden d-none d-md-block">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          {/* Table Header */}
          <TableHeader />

          {/* Table Body */}
          <tbody>
            {spendings.map((spending) => (
              <ExpenseRow
                key={spending.id}
                spending={spending}
                getPaymentBadgeClass={getPaymentBadgeClass}
                formatPaymentMethod={formatPaymentMethod}
                formatDate={formatDate}
                startEditing={startEditing}
                openEditModal={openEditModal}
                openModal={openModal}
                handleDelete={handleDelete}
              />
            ))}

            {spendings.length === 0 && (
              <EmptyState
                loading={loading}
              />
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 px-3 py-1 ">
        <div className="text-muted small">
          Showing {spendings.length} of {totalElements} expenses
        </div>

        {/* Page size selector and pagination */}
        <PageSizeSelector
          pageSize={pageSize}
          onChange={handlePageSizeChange}
        />

        {/* Pagination component */}
        <Pagination
          changePage={changePage}
          currentPage={currentPage}
          first={first}
          last={last}
          totalPages={totalPages}
        />
      </div>

      {/* Edit and Delete Modals */}
      <SpendingModal
        isOpen={editModalIsOpen}
        mode="edit"
        customStyles={customStyles}
        loadButton={loadButton}
        onClose={handleCloseEditModal}
        formValues={formValues}
        formIds={formIds}
        formPlaceHolders={formPlaceHolders}
        onChange={handleChange}
        errors={errors}
        onSubmit={handleEdit}
        loading={loading}
      />

      <DeleteSpendingModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        customStyles={customStyles}
        loadButton={loadButton}
        errors={errors}
        deleteSpending={deleteSpending}
        loading={loading}
      />
    </div>
  );
};

export default ExpenseTable;
import { useModal } from "../../hooks/useModal";
import { useSpending } from "../../hooks/useSpending";
import DeleteSpendingModal from "../modals/DeleteSpendingModal";
import EditSpendingModal from "../modals/EditSpedingModal";
import EmptyState from "./table/EmptyState";
import { ExpenseRow } from "./table/ExpenseRow";
import { Pagination } from "./table/Pagination";
import { TableHeader } from "./table/TableHeader";
import { PageSizeSelector } from "./table/PageSizeSelector";

const ExpenseTable = () => {
  const {
    spendings,
    totalElements,
    pageSize,
    setPageSize,
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
    selectedSpending,
    loading,
    loadButton,
    editSpending,
    deleteSpending,
    handleDelete,
    formatDate,
  } = useSpending();

  const { openEditModal, editModalIsOpen, closeEditModal, customStyles, modalIsOpen, closeModal, openModal } = useModal();

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextSize: number = Number(e.target.value);
    setPageSize(nextSize);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          {/* Table Header */}
          <TableHeader />

          {/* Table Body */}
          <tbody>
            {spendings.map((spending) => (
              <ExpenseRow
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
              <EmptyState />
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
        editSpending={editSpending}
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
    </div>
  );
};

export default ExpenseTable;
import { useExpenseView } from "../../hooks/useExpenseView";
import Card from "./mobile/Card";
import EmptyState from "./common/EmptyState";
import HeaderExpenseTableCard from "./mobile/ExpenseTableMobileHeader";
import ExpenseTableMobileFooter from "./mobile/ExpenseTableMobileFooter";
import SpendingModal from "../modals/SpendingModal";
import DeleteSpendingModal from "../modals/DeleteSpendingModal";

const ExpenseCard = () => {
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
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden d-md-none">
      <div className="card-body p-0">
        <div className="px-3 pt-3 pb-2">
          <HeaderExpenseTableCard
            totalElements={totalElements}
            pageSize={pageSize}
            handlePageSizeChange={handlePageSizeChange}
          />

          {spendings.length === 0 ? (
            <EmptyState loading={loading} variant="card" />
          ) : (
            <Card
              spendings={spendings}
              formatDate={formatDate}
              getPaymentBadgeClass={getPaymentBadgeClass}
              formatPaymentMethod={formatPaymentMethod}
              startEditing={startEditing}
              openEditModal={openEditModal}
              handleDelete={handleDelete}
              openModal={openModal}
            />
          )}
        </div>

        <div className="border-top">
          <ExpenseTableMobileFooter
            currentPage={currentPage}
            totalPages={totalPages}
            spendings={spendings}
            totalElements={totalElements}
            changePage={changePage}
            first={first}
            last={last}
          />
        </div>
      </div>

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

export default ExpenseCard;
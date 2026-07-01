import { useContent } from "../../hooks/useContent";
import { useModal } from "../../hooks/useModal";
import Card from "./Card";
import SpendingFilters from "./SpendingFilters";

const Content = () => {
  const {
    spendings,
    orderByDate,
    editingId,
    setEditingId,
    loadButton,
    errors,
    formatSpending,
    orderByAmount,
    orderByDescription,
    setSearch,
    minAmount,
    setMinAmount,
    maxAmount,
    setMaxAmount,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filterByDateRange,
    filterByAmount,
    restoreSpendings,
    totalAmount,
    handleDelete,
    deleteSpending,
    startEditing,
    handleChange,
    handleEdit
  } = useContent();

  const {
    openDeleteModal,
    deleteModalIsOpen,
    closeDeleteModal,
    customStyles,
  } = useModal();

  return (
    <main className="bg-body-tertiary d-flex flex-column p-3">
      <div className="d-flex justify-content-between align-items-center p-3 mb-4 bg-white rounded-4 shadow-sm border">
        <h2 className="m-0 fw-bold text-dark">Recent spendings</h2>

        <SpendingFilters
          minAmount={minAmount}
          setMinAmount={setMinAmount}
          maxAmount={maxAmount}
          setMaxAmount={setMaxAmount}
          filterByAmount={filterByAmount}
          restoreSpendings={restoreSpendings}
          orderByDate={orderByDate}
          orderByAmount={orderByAmount}
          orderByDescription={orderByDescription}
          setSearch={setSearch}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          filterByDateRange={filterByDateRange}
        />
      </div>

      <Card
        spendings={spendings}
        formatSpending={formatSpending}
        editingId={editingId}
        loadButton={loadButton}
        errors={errors}
        setEditingId={setEditingId}
        openModal={openDeleteModal}
        handleDelete={handleDelete}
        deleteSpending={deleteSpending}
        modalIsOpen={deleteModalIsOpen}
        closeModal={closeDeleteModal}
        customStyles={customStyles}
        startEditing={startEditing}
        handleChange={handleChange}
        handleEdit={handleEdit}
      />

      <h2 className="mt-auto pt-4 text-end fw-bold text-primary">
        Total amount: ${totalAmount.toFixed(2)}
      </h2>
    </main>
  )
}

export default Content;
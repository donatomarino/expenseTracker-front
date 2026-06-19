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
    deleteSpending
  } = useContent();

  const {
    openDeleteModal,
    deleteModalIsOpen,
    closeDeleteModal,
    customStyles,
    context
  } = useModal();

  return (
    <main className="bg-body-tertiary d-flex flex-column p-4">
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
        setEditingId={setEditingId}
        context={context}
        openModal={openDeleteModal}
        handleDelete={handleDelete}
        deleteSpending={deleteSpending}
        modalIsOpen={deleteModalIsOpen}
        closeModal={closeDeleteModal}
        customStyles={customStyles}
      />

      <h2 className="mt-auto pt-4 text-end fw-bold text-primary">
        Total amount: ${totalAmount}
      </h2>
    </main>
  )
}

export default Content;
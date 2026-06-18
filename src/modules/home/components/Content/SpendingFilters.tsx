import type { SpendingFiltersProps } from "../../../../types/types";

const SpendingFilters = ({ minAmount, setMinAmount, maxAmount, setMaxAmount, filterByAmount, restoreSpendings, orderByDate, orderByAmount, orderByDescription }: SpendingFiltersProps) => {
  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-outline-primary dropdown-toggle px-3"
          type="button"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          Filter by amount
        </button>

        <div className="dropdown-menu p-3 border-0 shadow rounded-4" style={{ minWidth: "280px" }}>
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">Min amount</label>
            <input
              type="number"
              className="form-control bg-light border-0 shadow-sm"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">Max amount</label>
            <input
              type="number"
              className="form-control bg-light border-0 shadow-sm"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100 fw-semibold" onClick={() => filterByAmount()}>
            Search
          </button>
          <button className="btn btn-light border w-100 mt-2" onClick={() => restoreSpendings()}>
            Restore
          </button>
        </div>
      </div>

      <div className="dropdown">
        <button className="btn btn-primary dropdown-toggle px-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Ordenar
        </button>
        <ul className="dropdown-menu border-0 shadow rounded-4">
          <li>
            <button className="dropdown-item py-2" onClick={() => orderByDate()}>Date</button>
          </li>
          <li>
            <button className="dropdown-item py-2" onClick={() => orderByAmount()}>Amount</button>
          </li>
          <li>
            <button className="dropdown-item py-2" onClick={() => orderByDescription()}>Description</button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default SpendingFilters;
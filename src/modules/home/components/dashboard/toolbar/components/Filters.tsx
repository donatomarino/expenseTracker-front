import type { FiltersProps } from "../../../../../../types/types";
import Button from "../../../../../common/components/Button";

const Filters = ({
  draft,
  handleChange,
  applyFilters,
  resetFilters
}: FiltersProps) => {
  return (
    <div className="dropdown flex-grow-1">
      <Button
        id="filters-dropdown"
        className="filters-button dropdown-toggle px-3 d-flex align-items-center justify-content-center gap-2 w-100"
        variant="primary"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        aria-haspopup="true"
      >
        <i className="bi bi-sliders2" aria-hidden="true"></i>
        <span>Filters</span>
      </Button>

      <div
        className="dropdown-menu dropdown-menu-end filters-menu p-3 border-0 shadow rounded-4"
        aria-labelledby="filters-dropdown"
        style={{ minWidth: "320px" }}
      >
        <div className="mb-3">
          <p className="mb-1 fw-semibold text-dark">Filter expenses</p>
          <small className="text-muted">Narrow down your results</small>
        </div>

        <div className="mb-3">
          <label htmlFor="payment-method" className="form-label small fw-semibold">
            Payment method
          </label>

          <select
            id="payment-method"
            className="form-select"
            value={draft.paymentMethod}
            onChange={(e) => handleChange("paymentMethod", e.target.value)}
          >
            <option value="">Select method</option>
            <option value="CASH">Cash</option>
            <option value="DEBIT_CARD">Debit card</option>
            <option value="CREDIT_CARD">Credit card</option>
            <option value="TRANSFER">Transfer</option>
          </select>
        </div>

        <div className="row g-2 mb-3">
          <div className="col-6">
            <label htmlFor="minimum-amount" className="form-label small fw-semibold">
              Min amount
            </label>

            <div className="input-group">
              <span className="input-group-text">€</span>
              <input
                id="minimum-amount"
                type="number"
                className="form-control"
                value={draft.minAmount}
                onChange={(e) => handleChange("minAmount", e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="col-6">
            <label htmlFor="maximum-amount" className="form-label small fw-semibold">
              Max amount
            </label>

            <div className="input-group">
              <span className="input-group-text">€</span>
              <input
                id="maximum-amount"
                type="number"
                className="form-control"
                value={draft.maxAmount}
                onChange={(e) => handleChange("maxAmount", e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        <div className="row g-2 mb-3">
          <div className="col-6">
            <label htmlFor="start-date" className="form-label small fw-semibold">
              Start date
            </label>
            <input
              id="start-date"
              type="date"
              className="form-control"
              value={draft.startDate}
              max={draft.endDate || undefined}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
          </div>

          <div className="col-6">
            <label htmlFor="end-date" className="form-label small fw-semibold">
              End date
            </label>
            <input
              id="end-date"
              type="date"
              className="form-control"
              value={draft.endDate}
              min={draft.startDate || undefined}
              onChange={(e) => handleChange("endDate", e.target.value)}
            />
          </div>
        </div>

        <div className="dropdown-divider"></div>

        <div className="d-flex gap-2">
          <Button
            variant="primary"
            className="flex-grow-1 fw-semibold"
            onClick={applyFilters}
          >
            Apply
          </Button>

          <Button
            variant="light"
            className="border flex-grow-1"
            onClick={resetFilters}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Filters;
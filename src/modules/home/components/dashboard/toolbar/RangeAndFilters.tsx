import { useSpendingContext } from "../../../../../context/SpendingContext";
import Button from "../../../../common/components/Button";
import { useSpending } from "../../../hooks/useSpending";

const RangeAndFilters = () => {
  const { getLast90Days } = useSpending();

  return (
    <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2">
      {/* Quick range */}
      <Button
        variant="outlinePrimary"
        className="range-button px-3 d-flex align-items-center justify-content-center gap-2"
        onClick={() => getLast90Days()}
      >
        <i className="bi bi-calendar3" aria-hidden="true"></i>
        <span>Last 90 days</span>
      </Button>

      {/* Filters dropdown */}
      <div className="dropdown">
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
        >
          <div className="mb-3">
            <p className="mb-1 fw-semibold text-dark">
              Filter expenses
            </p>

            <small className="text-muted">
              Narrow down your results
            </small>
          </div>

          {/* Payment method */}
          <div className="mb-3">
            <label
              htmlFor="payment-method"
              className="form-label small fw-semibold"
            >
              Payment method
            </label>

            <select
              id="payment-method"
              className="form-select"
              defaultValue=""
            >
              <option value="" disabled>
                Select method
              </option>
              <option value="cash">Cash</option>
              <option value="credit-card">Credit card</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>

          {/* Amount */}
          <div className="mb-3">
            <label
              htmlFor="minimum-amount"
              className="form-label small fw-semibold"
            >
              Minimum amount
            </label>

            <div className="input-group">
              <span className="input-group-text">€</span>

              <input
                id="minimum-amount"
                type="number"
                className="form-control"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="dropdown-divider"></div>

          <div className="d-flex gap-2">
            <Button
              variant="primary"
              className="flex-grow-1 fw-semibold"
              onClick={() => { }}
            >
              Apply
            </Button>

            <Button
              variant="light"
              className="border flex-grow-1"
              onClick={() => { }}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeAndFilters;
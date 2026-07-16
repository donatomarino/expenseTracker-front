import type { SpendingFiltersProps } from "../../../../types/types";
import Button from "../../../common/components/Button";

const SpendingFilters = (props: SpendingFiltersProps) => {
  const {
    minAmount,
    setMinAmount,
    maxAmount,
    setMaxAmount,
    filterByAmount,
    restoreSpendings,
    orderByDate,
    orderByAmount,
    orderByDescription,
    setSearch,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filterByDateRange
  } = props;

  return (
    <>
      <div>
        <form className="d-flex" role="search">
          <input
            className="form-control form-control-lg me-2 border-0 shadow-sm bg-light"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="dropdown">
        <Button
          className="dropdown-toggle px-3"
          variant="outlinePrimary"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          Filter by amount
        </Button>

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

          <Button
            className="w-100 fw-semibold"
            variant="primary"
            onClick={filterByAmount}
          >
            Search
          </Button>
          
          <Button
            className="border w-100 mt-2"
            variant="light"
            onClick={restoreSpendings}
          >
            Restore
          </Button>
        </div>
      </div>

      <div className="dropdown">
        <Button
          className="dropdown-toggle px-3"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
          variant="outlinePrimary"
        >
          Filter by date
        </Button>

        <div className="dropdown-menu p-3 border-0 shadow rounded-4" style={{ minWidth: "280px" }}>
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">Start date</label>
            <input
              type="date"
              className="form-control bg-light border-0 shadow-sm"
              value={startDate}
              max={endDate || undefined}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">End date</label>
            <input
              type="date"
              className="form-control bg-light border-0 shadow-sm"
              value={endDate}
              min={startDate || undefined}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <Button
            className="w-100 fw-semibold"
            onClick={filterByDateRange}
            variant="primary"
          >
            Search
          </Button>

          <Button
            className="border w-100 mt-2"
            onClick={restoreSpendings}
            variant="light"
          >
            Restore
          </Button>
        </div>
      </div>

      <div className="dropdown">
        <Button
          className="dropdown-toggle px-3"
          variant="primary"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Order
        </Button>
        <ul className="dropdown-menu border-0 shadow rounded-4">
          <li>
            <Button
              className="dropdown-item"
              onClick={orderByDate}
            >
              Date
            </Button>
          </li>
          <li>
            <Button
              className="dropdown-item"
              onClick={orderByAmount}
            >
              Amount
            </Button>
          </li>
          <li>
            <Button
              className="dropdown-item"
              onClick={orderByDescription}
            >
              Description
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SpendingFilters;
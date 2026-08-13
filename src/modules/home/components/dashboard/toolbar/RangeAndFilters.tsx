import Button from "../../../../common/components/Button";

const RangeAndFilters = () => {
  return (
     <div className="d-flex align-items-center gap-2">
        <Button variant="primary" className="px-3" onClick={() => {}}>
          Last 90 days
        </Button>

        <div className="dropdown">
          <Button
            id="filtersDropdown"
            className="dropdown-toggle px-3"
            variant="outlinePrimary"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            Filters
          </Button>
          <div
            className="dropdown-menu p-3 border-0 shadow rounded-4"
            style={{ minWidth: "260px" }}
            aria-labelledby="filtersDropdown"
          >
            <h6 className="dropdown-header text-muted mb-2">Filter by</h6>

            {/* filtros  */}
            
          </div>
        </div>
      </div>
  )
}

export default RangeAndFilters;
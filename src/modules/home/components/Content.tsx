import { useContent } from "../hooks/useContent";

const Content = () => {
  const { spendings, orderByDate, formatSpending, orderByAmount, orderByDescription, setSearch, minAmount, setMinAmount, maxAmount, setMaxAmount, filterByAmount, restoreSpendings, totalAmount } = useContent();

  return (
    <main className="bg-body-tertiary d-flex flex-column p-4">
      <div className="d-flex justify-content-between align-items-center p-3 mb-4 bg-white rounded-4 shadow-sm border">
        <h2 className="m-0 fw-bold text-dark">Recent spendings</h2>

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
      </div>

      <div className="d-flex flex-wrap gap-4 mt-2">
        {spendings.map((spending) => (
          <div
            key={spending.id}
            className="card border-0 shadow-sm rounded-4 overflow-hidden"
            style={{ width: "18rem" }}
          >
            <div className="card-body p-4">
              <h5 className="card-title fw-bold text-dark">{spending.description}</h5>
              <h6 className="card-subtitle mb-3 text-secondary">{formatSpending(spending.date)}</h6>
              <p className="card-text fs-4 fw-semibold text-primary mb-4">${spending.amount.toFixed(2)}</p>
              <button type="button" className="btn btn-outline-primary me-2">Modify</button>
              <button type="button" className="btn btn-outline-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-auto pt-4 text-end fw-bold text-primary">
        Total amount: ${totalAmount}
      </h2>
    </main>
  )
}

export default Content;
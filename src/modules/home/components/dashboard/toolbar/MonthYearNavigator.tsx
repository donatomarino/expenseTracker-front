import Button from "../../../../common/components/Button";

const MonthYearNavigator = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = ["2024", "2025", "2026"];

  return (
    <div className="d-flex align-items-center gap-2">
      <Button
        variant="secondary"
        className="rounded-circle d-flex align-items-center justify-content-center"
        onClick={() => { }}
      >
        <i className="bi bi-chevron-left"></i>
      </Button>

      <div className="d-flex align-items-center gap-2">
        {/* Mes */}
        <div className="dropdown">
          <Button
            id="monthDropdown"
            className="dropdown-toggle px-3"
            variant="secondary"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            August
          </Button>
          <div
            className="dropdown-menu p-2 border-0 shadow rounded-4"
            style={{ minWidth: "220px" }}
            aria-labelledby="monthDropdown"
          >
            <h6 className="dropdown-header text-muted">Select month</h6>
            {months.map((month) => (
              <button
                key={month}
                className="dropdown-item d-flex justify-content-between align-items-center"
                type="button"
              >
                <span>{month}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Año */}
        <div className="dropdown">
          <Button
            id="yearDropdown"
            className="dropdown-toggle px-3"
            variant="secondary"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            2026
          </Button>
          <div
            className="dropdown-menu p-2 border-0 shadow rounded-4"
            style={{ minWidth: "160px" }}
            aria-labelledby="yearDropdown"
          >
            <h6 className="dropdown-header text-muted">Select year</h6>
            {years.map((year) => (
              <button
                key={year}
                className="dropdown-item"
                type="button"
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button
        variant="secondary"
        className="rounded-circle d-flex align-items-center justify-content-center"
        onClick={() => { }}
      >
        <i className="bi bi-chevron-right"></i>
      </Button>
    </div>
  )
}

export default MonthYearNavigator;
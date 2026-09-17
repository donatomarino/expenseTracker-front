import Button from "../../../../common/components/Button";
import "../css/month-year-navigator.css";

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

const MonthYearNavigator = () => {
  return (
    <div className="month-year-navigator d-flex align-items-center gap-2">
      {/* Previous month */}
      <Button
        variant="light"
        className="navigation-button rounded-circle d-flex align-items-center justify-content-center border"
        onClick={() => {}}
        aria-label="Go to previous month"
      >
        <i
          className="bi bi-chevron-left"
          aria-hidden="true"
        ></i>
      </Button>

      {/* Month and year selectors */}
      <div className="d-flex align-items-center gap-2">
        {/* Month */}
        <div className="dropdown">
          <Button
            id="month-dropdown"
            className="period-button dropdown-toggle px-3 d-flex align-items-center gap-2"
            variant="light"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <i
              className="bi bi-calendar3"
              aria-hidden="true"
            ></i>

            <span>August</span>
          </Button>

          <div
            className="dropdown-menu period-menu p-2 border-0 shadow rounded-4"
            aria-labelledby="month-dropdown"
          >
            <p className="dropdown-header text-uppercase small fw-semibold">
              Select month
            </p>

            {months.map((month) => (
              <button
                key={month}
                type="button"
                className={`dropdown-item period-option ${
                  month === "August" ? "active" : ""
                }`}
                onClick={() => {}}
              >
                <span>{month}</span>

                {month === "August" && (
                  <i
                    className="bi bi-check-lg"
                    aria-hidden="true"
                  ></i>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Year */}
        <div className="dropdown">
          <Button
            id="year-dropdown"
            className="period-button dropdown-toggle px-3 d-flex align-items-center gap-2"
            variant="light"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <i
              className="bi bi-calendar-event"
              aria-hidden="true"
            ></i>

            <span>2026</span>
          </Button>

          <div
            className="dropdown-menu dropdown-menu-end period-menu year-menu p-2 border-0 shadow rounded-4"
            aria-labelledby="year-dropdown"
          >
            <p className="dropdown-header text-uppercase small fw-semibold">
              Select year
            </p>

            {years.map((year) => (
              <button
                key={year}
                type="button"
                className={`dropdown-item period-option ${
                  year === "2026" ? "active" : ""
                }`}
                onClick={() => {}}
              >
                <span>{year}</span>

                {year === "2026" && (
                  <i
                    className="bi bi-check-lg"
                    aria-hidden="true"
                  ></i>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Next month */}
      <Button
        variant="light"
        className="navigation-button rounded-circle d-flex align-items-center justify-content-center border"
        onClick={() => {}}
        aria-label="Go to next month"
      >
        <i
          className="bi bi-chevron-right"
          aria-hidden="true"
        ></i>
      </Button>
    </div>
  );
};

export default MonthYearNavigator;
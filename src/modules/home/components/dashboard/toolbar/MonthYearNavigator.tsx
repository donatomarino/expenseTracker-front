import { useSpendingContext } from "../../../../../context/SpendingContext";
import type { Month } from "../../../../../types/types";
import Button from "../../../../common/components/Button";
import { useSpending } from "../../../hooks/useSpending";
import "../css/month-year-navigator.css";

const MonthYearNavigator = () => {
  const { years, months, year, month, setYear, setMonth } = useSpendingContext();

  const formatMonth = (month: Month) => {
    return month.charAt(0).toLocaleUpperCase() + month.slice(1);
  }

  return (
    <div className="month-year-navigator d-flex align-items-center gap-2">
      {/* Previous month */}
      <Button
        variant="light"
        className="navigation-button rounded-circle d-flex align-items-center justify-content-center border"
        onClick={() => { }}
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

            <span>{formatMonth(month)}</span>
          </Button>

          <div
            className="dropdown-menu period-menu p-2 border-0 shadow rounded-4"
            aria-labelledby="month-dropdown"
          >
            <p className="dropdown-header text-uppercase small fw-semibold">
              Select month
            </p>

            {months.map((monthOption) => (
              <button
                key={monthOption}
                type="button"
                className={`dropdown-item period-option ${monthOption === month ? "active" : ""
                  }`}
                onClick={() => { setMonth(monthOption) }}
              >
                <span>{formatMonth(monthOption)}</span>

                {monthOption === month && (
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

            <span>{year}</span>
          </Button>

          <div
            className="dropdown-menu dropdown-menu-end period-menu year-menu p-2 border-0 shadow rounded-4"
            aria-labelledby="year-dropdown"
          >
            <p className="dropdown-header text-uppercase small fw-semibold">
              Select year
            </p>

            {years.map((yearOption) => (
              <button
                key={yearOption}
                type="button"
                className={`dropdown-item period-option ${yearOption === year ? "active" : ""
                  }`}
                onClick={() => { setYear(yearOption) }}
              >
                <span>{yearOption}</span>

                {yearOption === year && (
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
        onClick={() => { }}
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
import { useMemo, useState } from "react";

type Spending = {
  id: number;
  description: string;
  amount: number;
  date: string;
};

type SpendingsByMonth = Record<string, Spending[]>;

const monthNames = [
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
] as const;

const splitForMonth = (spendings: Spending[]): SpendingsByMonth => {
  const grouped: SpendingsByMonth = {};

  spendings.forEach((spending) => {
    const date = new Date(spending.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const key = `${year}-${String(month + 1).padStart(2, "0")}`;

    if (!grouped[key]) {
      grouped[key] = [];
    }

    grouped[key].push(spending);
  });

  return grouped;
};

export default function ContentTest() {
  const [spendings, setSpendings] = useState<Spending[]>([
    { id: 1, description: "Rent", amount: 850, date: "2026-01-03" },
    { id: 2, description: "Groceries", amount: 64, date: "2026-01-11" },
    { id: 3, description: "Gym", amount: 35, date: "2026-02-01" },
    { id: 4, description: "Coffee", amount: 4.5, date: "2025-01-08" },
  ]);

  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);

  const spendingsByMonth = useMemo(() => splitForMonth(spendings), [spendings]);

  const selectedKey = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}`;

  const visibleSpendings = useMemo(() => {
    return spendingsByMonth[selectedKey] ?? [];
  }, [spendingsByMonth, selectedKey]);

  const totalVisibleAmount = useMemo(() => {
    return visibleSpendings.reduce((sum, spending) => sum + spending.amount, 0);
  }, [visibleSpendings]);

  const availableYears = useMemo(() => {
    return [...new Set(
      spendings.map((spending) => new Date(spending.date).getFullYear())
    )].sort((a, b) => b - a);
  }, [spendings]);

  const addSpending = (newSpending: Omit<Spending, "id">) => {
    const spendingToAdd: Spending = {
      id: Date.now(),
      ...newSpending,
    };

    setSpendings((prev) => [spendingToAdd, ...prev]);
  };

  const deleteSpending = (id: number) => {
    setSpendings((prev) => prev.filter((spending) => spending.id !== id));
  };

  const updateSpending = (updatedSpending: Spending) => {
    setSpendings((prev) =>
      prev.map((spending) =>
        spending.id === updatedSpending.id ? updatedSpending : spending
      )
    );
  };

  return (
    <div>
      <h1>Expense tracker</h1>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {monthNames.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <h2>
          {monthNames[selectedMonth]} {selectedYear}
        </h2>
        <p>Total: €{totalVisibleAmount.toFixed(2)}</p>
        <p>Entries: {visibleSpendings.length}</p>
      </div>

      <button
        onClick={() =>
          addSpending({
            description: "New expense",
            amount: 20,
            date: `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-15`,
          })
        }
      >
        Add expense
      </button>

      {visibleSpendings.length === 0 ? (
        <p>No expenses for this month.</p>
      ) : (
        <ul>
          {visibleSpendings.map((spending) => (
            <li key={spending.id}>
              <span>{spending.description}</span>{" "}
              <span>€{spending.amount.toFixed(2)}</span>{" "}
              <span>{spending.date}</span>

              <button onClick={() => deleteSpending(spending.id)}>
                Delete
              </button>

              <button
                onClick={() =>
                  updateSpending({
                    ...spending,
                    amount: spending.amount + 1,
                  })
                }
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
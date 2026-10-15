export const TableHeader = () => {
  const rowHeaders: { label: string; className: string }[] = [
    { label: "Date", className: "px-4 py-3 text-muted small" },
    { label: "Description", className: "py-3 text-muted small" },
    { label: "Payment method", className: "py-3 text-muted small" },
    { label: "Amount", className: "py-3 text-muted small text-end" },
    { label: "Actions", className: "py-3 text-muted small text-center" },
  ];

  return (
    <thead className="table-light">
      <tr>
        {rowHeaders.map((header, index) => (
          <th
            key={index}
            scope="col"
            className={header.className}
          >
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};
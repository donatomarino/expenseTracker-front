import type { SearchInputProps } from "../../../../../types/types"

export const SearchInput = ({ search, setSearch}: SearchInputProps) => {
  return (
    <div className="expense-search">
      <label
        htmlFor="expense-search"
        className="visually-hidden"
      >
        Search expenses
      </label>

      <div className="input-group expense-search-group">
        <span className="input-group-text">
          <i className="bi bi-search" aria-hidden="true"></i>
        </span>

        <input
          id="expense-search"
          className="form-control"
          type="search"
          placeholder="Search expenses..."
          aria-label="Search expenses"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {search && (
          <button
            type="button"
            className="btn btn-light expense-clear-button"
            aria-label="Clear search"
            onClick={() => setSearch("")}
          >
            <i className="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        )}
      </div>
    </div>
  )
}
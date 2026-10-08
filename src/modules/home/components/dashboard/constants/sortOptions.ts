import type { SortOption } from "../../../../../types/types";

export const sortOptions: SortOption[] = [
  {
    value: "NEWEST",
    label: "Most recent",
  },
  {
    value: "OLDEST",
    label: "Oldest first",
  },
  {
    value: "AMOUNT_LOW_TO_HIGH",
    label: "Highest amount",
  },
  {
    value: "AMOUNT_HIGH_TO_LOW",
    label: "Lowest amount",
  },
  {
    value: "DESCRIPTION",
    label: "Description: A-Z",
  },
];
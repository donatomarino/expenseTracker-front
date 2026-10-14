import type {
  GetSpendingResponse,
  SpendingRequest,
  SpendingStatistics,
  UseSpendingListParams,
} from "../../../types/types";
import contentService from "../services/contentService";
import { useEffect, useState } from "react";

const useSpendingList = ({
  reload,
  year,
  month,
  months,
  dateSearchMode,
  startDate,
  endDate,
  search,
  selectedSort,
  pageSize,
  setSpendings,
  setPageSize,
  formatDateForRequest,
}: UseSpendingListParams) => {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [first, setFirst] = useState<boolean>(false);
  const [last, setLast] = useState<boolean>(false);

  const [statistics, setStatistics] = useState<SpendingStatistics>({
    totalSpent: 0,
    totalTransactions: 0,
    average: 0,
  });

  // Builds query params for the spending request
  const buildSpendingParams = (page = 0, size = pageSize): SpendingRequest => {
    const baseParams: SpendingRequest = {
      page,
      size,
    };

    if (search) {
      baseParams.search = search;
    }

    if (selectedSort) {
      baseParams.sort = selectedSort;
    }

    if (dateSearchMode === "last90Days") {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 90);

      return {
        ...baseParams,
        startDate: formatDateForRequest(start),
        endDate: formatDateForRequest(end),
      };
    }

    if (startDate && endDate) {
      return {
        ...baseParams,
        startDate,
        endDate,
      };
    }

    const monthIndex = months.indexOf(month) + 1;

    return {
      ...baseParams,
      month: monthIndex,
      year,
    };
  };

  const apiRequest = async (params: SpendingRequest): Promise<GetSpendingResponse> => {
    return await contentService.getSpending(params);
  }

  // Setter response api request
  const applySpendingResponse = (res: GetSpendingResponse, pageNumber = 1): void => {
    setSpendings(res.spendings ?? []);
    setCurrentPage(pageNumber);
    setPageSize(res.size);
    setTotalElements(res.totalElements);
    setTotalPages(res.totalPages);
    setFirst(res.first);
    setLast(res.last);
    setStatistics({
      totalSpent: res.statistics.totalSpent,
      totalTransactions: res.statistics.totalTransactions,
      average: res.statistics.average
    });
  }

  // Load spendings by params
  const loadSpendings = async (): Promise<void> => {
    try {
      const params = buildSpendingParams(0, pageSize);
      const res = await apiRequest(params);
      applySpendingResponse(res, 1);
    } catch (e: any) {
      console.error("Error loading spendings: ", e);
    }
  };

  const changePage = async (page: number): Promise<void> => {
    if (page < 1 || page > totalPages) return;

    try {
      // Backend pagination is zero-based, UI pagination is one-based.
      const params = buildSpendingParams(page - 1, pageSize);
      const res = await apiRequest(params);
      applySpendingResponse(res, page);
    } catch (e: any) {
      console.error("Error loading spendings", e);
    }
  };

  useEffect(() => {
    loadSpendings();
  }, [reload, year, month, dateSearchMode, startDate, endDate, search, selectedSort, pageSize]);

  return { currentPage, totalPages, totalElements, first, last, statistics, changePage };
};

export default useSpendingList;

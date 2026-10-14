const spendingUtils = () => {
  // Format spending date for UI display
  const formatDate = (date: string): string => {
    const today = new Date();
    const spendingDate = new Date(date);

    const msPerDay = 24 * 60 * 60 * 1000;
    const daysAgo = Math.floor((today.getTime() - spendingDate.getTime()) / msPerDay);

    if (daysAgo < 7) {
      if (daysAgo === 0) return "Today";
      if (daysAgo === 1) return "1 day ago";
      return `${daysAgo} days ago`;
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  // Formats dates as YYYY-MM-DD for API requests
  const formatDateForRequest = (date: Date): string => {
    return date.toISOString().slice(0, 10);
  };

  return { formatDate, formatDateForRequest }
}

export default spendingUtils;
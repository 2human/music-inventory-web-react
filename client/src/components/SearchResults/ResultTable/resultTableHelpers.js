export const resultSegment = (
  results,
  resultsPerPage,
  pageNumber
) => {
  const firstResultIndex = (pageNumber - 1) * resultsPerPage;
  const lastResultIndex = resultsPerPage * pageNumber;
  return results.slice(firstResultIndex, lastResultIndex);
};

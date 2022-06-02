/**
 * @param {*} resultsPerPage
 * @param {*} pageNumber
 * @param {*} totalResults
 * @returns range of results being displayed in result message
 */
export const multiPageResultsMessage = (
  resultsPerPage,
  pageNumber,
  totalResults
) => {
  const lastPageNumber = Math.ceil(totalResults / resultsPerPage);
  const firstResult = (pageNumber - 1) * resultsPerPage + 1;
  let lastResult;
  if (pageNumber == lastPageNumber) {
    lastResult = totalResults;
  } else {
    lastResult = pageNumber * resultsPerPage;
  }
  return `Displaying ${firstResult}-${lastResult} of ${totalResults} results...`;
};

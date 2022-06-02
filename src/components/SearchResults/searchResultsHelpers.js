export const noResultsFound = (resultsLength, status) => {
  return resultsLength === 0 && status === 'SUCCESSFUL';
};

export const resultsFound = (resultsLength, status) => {
  return resultsLength > 0 && status === 'SUCCESSFUL';
};

export const onePageOfResultsFound = (
  resultsLength,
  resultsPerPage
) => resultsLength <= resultsPerPage;

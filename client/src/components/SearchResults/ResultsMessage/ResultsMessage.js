import React from 'react';
import { multiPageResultsMessage } from './resultsMessageHelpers';

export const ResultsMessage = ({
  status,
  totalResults,
  resultsPerPage,
  pageNumber,
}) => {
  const renderResultsMessage = () => {
    if (status === 'FAILED') {
      return <SearchFailedMessage />;
    } else if (status === 'SUCCESSFUL' && totalResults === 0) {
      //no results
      return <NoResultsMessage />;
    } else if (
      status === 'SUCCESSFUL' &&
      totalResults <= resultsPerPage
    ) {
      //single page of results
      return <SinglePageMessage totalResults={totalResults} />;
    } else if (
      status === 'SUCCESSFUL' &&
      totalResults > resultsPerPage
    ) {
      //multiple pages of results
      return (
        <MultiPageMessage
          resultsPerPage={resultsPerPage}
          pageNumber={pageNumber}
          totalResults={totalResults}
        />
      );
    }
  };

  return (
    <div id="resultsMessage" className="results-message">
      {renderResultsMessage()}
    </div>
  );
};

const SearchFailedMessage = () => (
  <div id="searchFailed">
    There was an error with your search. Please check your connection
    and try again.
  </div>
);

const NoResultsMessage = () => (
  <div id="noResults">No results found...</div>
);

const SinglePageMessage = ({ totalResults }) => (
  <div id="singlePage">{`Displaying  ${totalResults} ${
    totalResults === 1 ? 'result...' : 'results...'
  }`}</div>
);

const MultiPageMessage = ({
  resultsPerPage,
  pageNumber,
  totalResults,
}) => (
  <div id="multiPage">
    {multiPageResultsMessage(
      resultsPerPage,
      pageNumber,
      totalResults
    )}
  </div>
);

ResultsMessage.defaultExport = {
  status: '',
  totalResults: 0,
  resultsPerPage: 1,
  pageNumber: 1,
};

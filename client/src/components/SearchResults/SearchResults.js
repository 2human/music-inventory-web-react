import React from 'react';
import { ConnectedPageButtons } from './PageButtons/ConnectedPageButtons';
import { ConnectedResultsMessage } from './ResultsMessage/ConnectedResultMessage';
import { ConnectedResultsPerPage } from './ResultsPerPage/ConnectedResultsPerPage';
import { ConnectedResultTable } from './ResultTable/ConnectedResultTable';
import {
  noResultsFound,
  onePageOfResultsFound,
  resultsFound,
} from './searchResultsHelpers';

export const SearchResults = ({
  resultsLength,
  status,
  resultsPerPage,
}) => {
  const renderElements = (resultsLength, status) => {
    if (status === 'SUBMITTING') {
      return (
        <PaddingContainer>
          <LoadingSpinner />
        </PaddingContainer>
      );
    } else if (
      status === 'FAILED' ||
      noResultsFound(resultsLength, status)
    ) {
      return (
        <PaddingContainer>
          <ConnectedResultsMessage />
        </PaddingContainer>
      );
    } else if (resultsFound(resultsLength, status)) {
      if (onePageOfResultsFound(resultsLength, resultsPerPage)) {
        return (
          <PaddingContainer>
            <SearchPropertiesContainer>
              <ConnectedResultsMessage />
              <ConnectedResultsPerPage />
            </SearchPropertiesContainer>
            <ConnectedResultTable />
          </PaddingContainer>
        );
      } else {
        return (
          <PaddingContainer>
            <ConnectedPageButtons />
            <SearchPropertiesContainer>
              <ConnectedResultsMessage />
              <ConnectedResultsPerPage />
            </SearchPropertiesContainer>
            <ConnectedResultTable />
            <ConnectedPageButtons />
          </PaddingContainer>
        );
      }
    }
  };

  return (
    <section id="searchResults" className="section-search-results">
      {renderElements(resultsLength, status)}
    </section>
  );
};

//inserted to keep SearchResults wrapper hidden prior to search
export const PaddingContainer = ({ children }) => (
  <div style={{ padding: '2rem 0' }}>{children}</div>
);

export const LoadingSpinner = () => (
  <div className="spinner__container">
    <div className="spinner__animation" />
  </div>
);

export const SearchPropertiesContainer = ({ children }) => (
  <div className="search-properties">{children}</div>
);

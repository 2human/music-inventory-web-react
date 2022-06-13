import React from 'react';
import { ResultsMessage } from '../../components/SearchResults/ResultsMessage/ResultsMessage';
import { multiPageResultsMessage } from '../../components/SearchResults/ResultsMessage/resultsMessageHelpers';
import { createContainer } from '../domManipulators';

describe('ResultsMessage', () => {
  let render, element;

  beforeEach(() => {
    ({ render, element } = createContainer());
  });

  it('renders the resultsMessage div', () => {
    render(<ResultsMessage />);
    expect(element('div#resultsMessage')).not.toBeNull();
  });

  it('renders the searchFailed message when status is FAILED', () => {
    render(<ResultsMessage status="FAILED" />);
    expect(element('div#searchFailed')).not.toBeNull();
  });

  it('renders the noResults message on successful search with no results', () => {
    render(<ResultsMessage status="SUCCESSFUL" totalResults={0} />);
    expect(element('div#noResults')).not.toBeNull();
  });

  it('renders the singlePage results message with right number of results on successful search with one page of search results', () => {
    const totalResults = 3;
    render(
      <ResultsMessage
        status="SUCCESSFUL"
        totalResults={totalResults}
        resultsPerPage={5}
      />
    );
    const message = element('div#singlePage');
    expect(message).not.toBeNull();
    expect(message.textContent).toContain(totalResults.toString());
  });

  it('renders multiPage results message when total results exceed results per page', () => {
    const totalResults = 23;
    const pageNumber = 3;
    const resultsPerPage = 5;
    render(
      <ResultsMessage
        status="SUCCESSFUL"
        totalResults={totalResults}
        resultsPerPage={resultsPerPage}
        pageNumber={pageNumber}
      />
    );
    const message = element('div#multiPage');
    expect(message).not.toBeNull();
    expect(message.textContent).toEqual(
      multiPageResultsMessage(
        resultsPerPage,
        pageNumber,
        totalResults
      )
    );
  });
});

describe('resultsMessageHelpers', () => {
  describe('multiPageResultsMessage', () => {
    const resultsPerPage = 5;
    const totalResults = 23;

    it('returns the range when not viewing last page', () => {
      const pageNumber = 2;
      expect(
        multiPageResultsMessage(
          resultsPerPage,
          pageNumber,
          totalResults
        )
      ).toEqual('Displaying 6-10 of 23 results...');
    });

    it('returns the range when viewing last page', () => {
      const lastPageNumber = Math.ceil(totalResults / resultsPerPage);
      expect(
        multiPageResultsMessage(
          resultsPerPage,
          lastPageNumber,
          totalResults
        )
      ).toEqual('Displaying 21-23 of 23 results...');
    });
  });
});

import { render } from '@testing-library/react';
import React from 'react';
import { ConnectedPageButtons } from '../../components/SearchResults/PageButtons/ConnectedPageButtons';
import { ConnectedResultsMessage } from '../../components/SearchResults/ResultsMessage/ConnectedResultMessage';
import { ConnectedResultTable } from '../../components/SearchResults/ResultTable/ConnectedResultTable';
import {
  LoadingSpinner,
  SearchResults,
} from '../../components/SearchResults/SearchResults';
import { createShallowRenderer, type } from '../shallowHelpers';

describe('ResultTable', () => {
  let shallowRender, elementMatching, elementsMatching;

  beforeEach(() => {
    ({ shallowRender, elementMatching, elementsMatching } =
      createShallowRenderer());
  });

  it('renders the ConnectedResultTable when results length is greater than zero and status is SUCCESSFUL', () => {
    shallowRender(
      <SearchResults resultsLength={2} status={'SUCCESSFUL'} />
    );
    expect(elementMatching(type(ConnectedResultTable))).toBeDefined();
  });

  it('does not render the ConnectedResultTable when results are undefined', () => {
    shallowRender(<SearchResults />);
    expect(
      elementMatching(type(ConnectedResultTable))
    ).not.toBeDefined();
  });

  it('renders the loading spinner when search status is submitting', () => {
    shallowRender(<SearchResults status={'SUBMITTING'} />);
    expect(elementMatching(type(LoadingSpinner))).toBeDefined();
  });

  it('renders ConnectedResultsMessage when request fails', () => {
    shallowRender(<SearchResults status={'FAILED'} />);
    expect(
      elementMatching(type(ConnectedResultsMessage))
    ).toBeDefined();
  });

  it('renders ConnectedResultsMessage when search is succesful but result array is empty', () => {
    shallowRender(
      <SearchResults status={'SUCCESSFUL'} resultsLength={0} />
    );
    expect(
      elementMatching(type(ConnectedResultsMessage))
    ).toBeDefined();
  });

  it('renders two ConnectedPageButtons elements, one at top, one at bottom, when search results are found', () => {
    shallowRender(
      <SearchResults status={'SUCCESSFUL'} resultsLength={5} />
    );
    expect(elementsMatching(type(ConnectedPageButtons))).toHaveLength(
      2
    );
  });

  it('renders ConnectedResultsMessage when search results are found', () => {
    shallowRender(
      <SearchResults status={'SUCCESSFUL'} resultsLength={5} />
    );
    expect(
      elementMatching(type(ConnectedResultsMessage))
    ).toBeDefined();
  });

  it('renders ConnectedResultsMessage when search results are found', () => {
    shallowRender(
      <SearchResults status={'SUCCESSFUL'} resultsLength={5} />
    );
    expect(elementMatching(type(ConnectedResultTable))).toBeDefined();
  });

  it('does not render the PageButtons when there is only one page of results', () => {
    shallowRender(
      <SearchResults
        status={'SUCCESSFUL'}
        resultsLength={4}
        resultsPerPage={5}
      />
    );
    expect(
      elementMatching(type(ConnectedPageButtons))
    ).not.toBeDefined();
  });
});

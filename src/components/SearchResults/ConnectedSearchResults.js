import { connect } from 'react-redux';
import { SearchResults } from './SearchResults';

export const mapStateToProps = (state, ownProps) => ({
  status: ownProps.status || state.search.status,
  resultsLength:
    ownProps.resultsLength || state.search.results === undefined
      ? undefined
      : state.search.results.length,
  resultsPerPage: state.search.resultsPerPage,
});

export const ConnectedSearchResults =
  connect(mapStateToProps)(SearchResults);

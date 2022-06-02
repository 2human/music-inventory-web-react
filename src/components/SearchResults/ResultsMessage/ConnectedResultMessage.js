import { connect } from 'react-redux';
import { ResultsMessage } from './ResultsMessage';

export const mapStateToProps = (state) => ({
  status: state.search.status,
  totalResults: state.search.results
    ? state.search.results.length
    : 0,
  resultsPerPage: state.search.resultsPerPage,
  pageNumber: state.search.currentPage,
});

export const mapDispatchToProps = {};

export const ConnectedResultsMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsMessage);

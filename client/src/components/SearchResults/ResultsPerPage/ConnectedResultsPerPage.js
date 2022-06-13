import { connect } from 'react-redux';
import { searchSetResultsPerPage } from '../../../store/actions';
import { ResultsPerPage } from './ResultsPerPage';

export const mapStateToProps = (state) => ({
  options: state.search.resultsPerPageOptions,
  selected: state.search.resultsPerPage,
});

export const mapDispatchToProps = {
  handleOptionClick: searchSetResultsPerPage,
};

export const ConnectedResultsPerPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsPerPage);

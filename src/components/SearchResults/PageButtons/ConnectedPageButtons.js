import { connect } from 'react-redux';
import { searchSelectPage } from '../../../store/actions';
import { PageButtons } from './PageButtons';

export const mapStateToProps = (state) => ({
  maxButtons: state.search.maxPageButtons,
  currentPage: state.search.currentPage,
  totalPages: Math.ceil(
    state.search.results.length / state.search.resultsPerPage
  ),
});

export const mapDispatchToProps = {
  handleButtonClick: searchSelectPage,
};

export const ConnectedPageButtons = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageButtons);

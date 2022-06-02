import { connect } from 'react-redux';
import {
  openEditRow,
  openViewRow,
  searchSetSortOrderAndSort,
} from '../../../store/actions';
import { ResultTable } from './ResultTable';
import { resultSegment } from './resultTableHelpers';

export const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  columnData:
    ownProps.columnData ||
    state.search.columnData[state.search.dataType],
  dataType: ownProps.dataType || state.search.dataType,
  results:
    ownProps.results ||
    (state.search.results &&
      resultSegment(
        state.search.results,
        state.search.resultsPerPage,
        state.search.currentPage
      )),
  sortBy: ownProps.sortBy || state.search.sortBy,
});

export const mapDispatchToProps = {
  handleCellDoubleClick: openEditRow,
  handleExpandIconClick: openViewRow,
  handleHeaderClick: searchSetSortOrderAndSort,
};

export const ConnectedResultTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultTable);

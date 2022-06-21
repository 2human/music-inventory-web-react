import { connect } from 'react-redux';
import { rowData } from '../SingleRowForm/singleRowFormHelpers';
import { SingleRowView } from './SingleRowView';

export const mapStateToProps = (state) => ({
  fields: state.modal.fields[state.modal.dataType],
  data: rowData(state.search.results, state.modal.rowId),
});

export const ConnectedSingleRowView =
  connect(mapStateToProps)(SingleRowView);

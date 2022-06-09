import { connect } from 'react-redux';
import { SingleRowForm } from './SingleRowForm';
import { rowData } from './singleRowFormHelpers';

export const mapStateToProps = (state, ownProps) => ({
  fields: state.modal.fields,
  data: rowData(state.search.data, state.modal.rowId),
});

export const mapDispatchToProps = {};

export const ConnectedSingleRowForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleRowForm);

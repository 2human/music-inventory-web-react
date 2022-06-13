import { connect } from 'react-redux';
import {
  submitCreate,
  submitDelete,
  submitUpdate,
} from '../../store/actions';
import { SingleRowForm } from './SingleRowForm';
import { rowData } from './singleRowFormHelpers';

export const mapStateToProps = (state) => ({
  fields: state.modal.fields[state.modal.dataType],
  data: rowData(state.search.results, state.modal.rowId),
  status: state.modal.status,
});

export const mapDispatchToProps = {
  updateRow: submitUpdate,
  deleteRow: submitDelete,
  createRow: submitCreate,
};

export const ConnectedSingleRowForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleRowForm);

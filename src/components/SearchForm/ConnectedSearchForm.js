import { connect } from 'react-redux';
import { SEARCH_REQUEST } from '../../store/actions/actionTypes';
import { SearchForm } from './SearchForm';

const mapStateToProps = (_, ownProps) => ({
  ...ownProps,
});
const mapDispatchToProps = {
  searchRequest: (formInputs) => ({
    type: SEARCH_REQUEST,
    formInputs,
  }),
};

export const ConnectedSearchForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm);

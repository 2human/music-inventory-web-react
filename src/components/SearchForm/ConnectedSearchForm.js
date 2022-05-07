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

ConnectedSearchForm.defaultProps = {
  tableSelectFields: [
    { value: 'table1default', label: 'label1default' },
    { value: 'table2default', label: 'label2default' },
  ],
  basicSearchFields: {
    table1default: [
      {
        value: 'option1',
        label: 'Option11',
      },
      {
        value: 'option2',
        label: 'Option2',
      },
      {
        value: 'option3',
        label: 'Option3',
      },
    ],
  },
  advancedSearchFields: {
    table1default: {
      rows: [
        [
          { name: 'name1', label: 'label1', size: 'short' },
          { name: 'name3', label: 'label3', size: 'long' },
        ],
        [{ name: 'name2', label: 'label2', size: 'long' }],
      ],
    },
  },
  initialTable: 'table1default',
};

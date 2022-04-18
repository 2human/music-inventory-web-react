import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectTable } from '../../assets/data/actions';

export const TableSelectRadios = ({
  tableOptions,
  handleTableChange,
  selectedTable,
}) => {
  // console.log(props.searchInput);

  useEffect(() => {
    selectTable(selectedTable);
  }, []);

  return (
    <TableSelectContainer>
      {tableOptions.map((option) => (
        <TableSelectOption
          key={option.value}
          value={option.value}
          label={option.label}
          selected={option.value === selectedTable}
          handleTableChange={handleTableChange}
        />
      ))}
    </TableSelectContainer>
  );
};

const TableSelectContainer = ({ children }) => {
  return (
    <div id="TableSelectRadios" className="u-margin-bottom-tiny">
      {children}
    </div>
  );
};

export const TableSelectOption = ({
  value,
  label,
  selected,
  handleTableChange,
}) => {
  return (
    <React.Fragment>
      <input
        className="table-select__radio-btn"
        type="radio"
        name="table"
        value={value}
        id={value}
        checked={selected}
        onChange={handleTableChange}
      />
      <label className="table-select__radio-label" htmlFor={value}>
        {label}
      </label>
    </React.Fragment>
  );
};

TableSelectRadios.defaultProps = {
  tableOptions: [
    {
      value: 'collections',
      label: 'Collections',
    },
    {
      value: 'sources',
      label: 'Sources',
    },
    {
      value: 'entries',
      label: 'Entries',
    },
  ],
  selectedTable: 'sources',
  handleTableChange: () => {},
};

TableSelectOption.defaultProps = {
  value: 'value',
  label: 'label',
  selected: 'false',
  handleTableChange: () => {},
};

// const mapStateToProps = state => {
//   return { searchInput: state.searchInput };
// };

// const mapDispatchToProps = ({
//   selectTable
// });

// export const ConnectedTableSelectRadios = connect(
//   mapStateToProps,
//   mapDispatchToProps
//   )(TableSelectRadios);

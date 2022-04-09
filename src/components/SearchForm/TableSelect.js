import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectTable } from '../../assets/data/actions';

export const TableSelect = ({
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
          key={option.name}
          name={option.name}
          label={option.label}
          selected={option.name === selectedTable}
          handleTableChange={handleTableChange}
        />
      ))}
    </TableSelectContainer>
  );
};

const TableSelectContainer = ({ children }) => {
  return (
    <div id="tableSelect" className="u-margin-bottom-tiny">
      {children}
    </div>
  );
};

export const TableSelectOption = ({
  name,
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
        value={name}
        id={name}
        checked={selected}
        onChange={handleTableChange}
      />
      <label className="table-select__radio-label" htmlFor={name}>
        {label}
      </label>
    </React.Fragment>
  );
};

TableSelect.defaultProps = {
  tableOptions: [
    {
      name: 'collections',
      label: 'Collections',
    },
    {
      name: 'sources',
      label: 'Sources',
    },
    {
      name: 'entries',
      label: 'Entries',
    },
  ],
  selectedTable: 'sources',
  handleTableChange: () => {},
};

TableSelectOption.defaultProps = {
  name: 'name',
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

// export const ConnectedTableSelect = connect(
//   mapStateToProps,
//   mapDispatchToProps
//   )(TableSelect);

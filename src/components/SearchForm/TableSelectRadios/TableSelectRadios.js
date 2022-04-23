import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectTable } from '../../../assets/data/actions';

export const TableSelectRadios = ({
  fieldData,
  handleTableChange,
  selectedTable,
}) => {
  // console.log(props.searchInput);

  useEffect(() => {
    selectTable(selectedTable);
  }, []);

  return (
    <TableSelectContainer>
      {fieldData.map((option) => (
        <React.Fragment key={option.value}>
          <TableSelectRadio
            value={option.value}
            selected={option.value === selectedTable}
            handleTableChange={handleTableChange}
          />
          <TableSelectRadioLabel
            label={option.label}
            value={option.value}
          />
        </React.Fragment>
      ))}
    </TableSelectContainer>
  );
};

const TableSelectContainer = ({ children }) => {
  return (
    <div id="tableSelectRadios" className="u-margin-bottom-tiny">
      {children}
    </div>
  );
};

export const TableSelectRadio = ({
  value,
  label,
  selected,
  handleTableChange,
}) => (
  <input
    className="table-select__radio-btn"
    type="radio"
    name="table"
    value={value}
    id={value}
    checked={selected}
    onChange={handleTableChange}
  />
);

const TableSelectRadioLabel = ({ value, label }) => (
  <label className="table-select__radio-label" htmlFor={value}>
    {label}
  </label>
);

TableSelectRadios.defaultProps = {
  fieldData: [
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

TableSelectRadio.defaultProps = {
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

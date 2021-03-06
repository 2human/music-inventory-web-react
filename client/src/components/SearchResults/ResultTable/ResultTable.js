import React from 'react';

export const ResultTable = ({
  results,
  dataType,
  columnData,
  sortBy,
  handleHeaderClick,
  handleExpandIconClick,
  handleCellDoubleClick,
}) => {
  return (
    <ResultTableContainer>
      <table id="resultTable" className="table">
        <ResultTableColGroup
          columnData={columnData}
          dataType={dataType}
        />
        <ResultTableHeader
          columnData={columnData}
          handleHeaderClick={handleHeaderClick}
          sortBy={sortBy}
        />
        <ResultTableBody>
          {results.map((rowData, i) => (
            <ResultTableDataRow
              expandColumnExists={columnData.expand !== undefined}
              rowData={rowData}
              handleExpandIconClick={handleExpandIconClick}
              handleCellDoubleClick={handleCellDoubleClick}
              key={i}
            />
          ))}
        </ResultTableBody>
      </table>
    </ResultTableContainer>
  );
};

const ResultTableContainer = ({ children }) => (
  <div id="resultTable" className="search-results">
    {children}
  </div>
);

const ResultTableColGroup = ({ columnData, dataType }) => (
  <colgroup>
    {Object.keys(columnData).map((columnName) => (
      <col
        key={columnName}
        className={`table__${dataType}-column--${columnData[columnName].classMod}`}
      />
    ))}
  </colgroup>
);

const ResultTableHeader = ({
  columnData,
  sortBy,
  handleHeaderClick,
}) => (
  <ResultTableHeaderContainer>
    {Object.keys(columnData).map((columnName) => (
      <ResultTableHeaderCell
        key={columnName}
        column={{ ...columnData[columnName], name: columnName }}
        handleHeaderClick={handleHeaderClick}
        sortBy={sortBy}
      />
    ))}
  </ResultTableHeaderContainer>
);

const ResultTableHeaderContainer = ({ children }) => (
  <thead>
    <tr id="tableHeaders">{children}</tr>
  </thead>
);

const headerCellClassMods = (columnName) => {
  let mods = [];
  if (columnName === 'isSecular')
    mods.push('table__entry-cell--is-secular'); //centers checkboxes
  return mods.join(' ');
};

const ResultTableHeaderCell = ({
  column,
  sortBy,
  handleHeaderClick,
}) => (
  <th className={`table__header ${headerCellClassMods(column.name)}`}>
    {column.name !== 'expand' && (
      <ResultTableHeaderCellContent
        column={column}
        handleHeaderClick={handleHeaderClick}
        sortBy={sortBy}
      />
    )}
  </th>
);

const ResultTableHeaderCellContent = ({
  column,
  sortBy,
  handleHeaderClick,
}) => (
  <a
    href="#"
    className="table__header-text btn-text"
    onClick={() => handleHeaderClick(column.name)}>
    {column.label}
    {column.name === sortBy.column && (
      <SortArrow
        direction={sortBy.order === 'ascending' ? 'down' : 'up'}
      />
    )}
  </a>
);

const SortArrow = ({ direction }) => {
  return (
    <i
      className={`table__header-text ${direction}-arrow btn-text__${direction}-arrow`}
    />
  );
};

const ResultTableBody = ({ children }) => <tbody>{children}</tbody>;

const ResultTableDataRow = ({
  rowData,
  expandColumnExists,
  handleExpandIconClick,
  handleCellDoubleClick,
}) => (
  <tr className="table__row">
    {expandColumnExists && (
      <ResultTableExpandIconCell
        handleExpandIconClick={handleExpandIconClick}
        rowData={rowData}
      />
    )}
    {Object.keys(rowData).map(
      (columnName) =>
        columnName !== 'id' && (
          <ResultTableDataCell
            key={columnName}
            rowData={rowData}
            columnName={columnName}
            handleCellDoubleClick={handleCellDoubleClick}
          />
        )
    )}
  </tr>
);

const ResultTableExpandIconCell = ({
  handleExpandIconClick,
  rowData,
}) => (
  <td className="table__data">
    <ExpandIcon
      handleExpandIconClick={handleExpandIconClick}
      rowData={rowData}
    />
  </td>
);

const ExpandIcon = ({ handleExpandIconClick, rowData }) => (
  <svg
    className="btn-expand"
    onClick={() => handleExpandIconClick(rowData)}>
    <use xlinkHref="images/sprite.svg#icon-magnifying-glass"></use>
  </svg>
);

const cellClassMods = (columnName) => {
  let mods = [];
  if (columnName === 'inscription' || columnName === 'description')
    mods.push('u-retain-indentation');
  if (columnName === 'isSecular')
    mods.push('table__entry-cell--is-secular'); //centers checkboxes
  return mods.join(' ');
};

const ResultTableDataCell = ({
  columnName,
  rowData,
  handleCellDoubleClick,
}) => {
  const renderCellContent = () => {
    if (columnName === 'isSecular') {
      return (
        <IsSecularCheckbox checked={rowData[columnName] === 'true'} />
      );
    } else {
      return rowData[columnName];
    }
  };
  return (
    <td
      className={`table__data ${cellClassMods(columnName)}`}
      onDoubleClick={() =>
        handleCellDoubleClick(rowData, columnName)
      }>
      {renderCellContent()}
    </td>
  );
};

const IsSecularCheckbox = ({ checked }) => (
  <input checked={checked} type="checkbox" disabled />
);

ResultTable.defaultProps = {
  columnData: {},
  dataType: '',
  results: [],
  sortBy: { column: '', order: '' },
  handleHeaderClick: () => {},
  handleExpandIconClick: () => {},
  handleCellDoubleClick: () => {},
};

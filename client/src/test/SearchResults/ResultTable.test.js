import React from 'react';
import { ResultTable } from '../../components/SearchResults/ResultTable/ResultTable';
import { resultSegment } from '../../components/SearchResults/ResultTable/resultTableHelpers';
import { createContainer } from '../domManipulators';

describe('ResultTable', () => {
  let render, element, elements, click, dblClick;

  const columnData = {
    col1: {
      label: 'Col 1',
      classMod: 'col2',
    },
    col2: {
      label: 'Col 2',
      classMod: 'col2',
    },
  };
  const columnNames = Object.keys(columnData);

  const dataType = 'sampleType';

  const results = [
    { col1: 'row1col1data', col2: 'row1col2data' },
    { col1: 'row2col1data', col2: 'row2col2data' },
  ];

  const resultFieldNames = Object.keys(results[0]);

  beforeEach(() => {
    ({ render, element, elements, click, dblClick } =
      createContainer());
  });

  it('renders the resultTable table element', () => {
    render(<ResultTable />);
    expect(element('table#resultTable')).not.toBeNull();
  });

  describe('colgroup', () => {
    it('element is rendered', () => {
      render(<ResultTable />);
      expect(element('colgroup')).not.toBeNull();
    });

    it('contains a col element for each column', () => {
      render(<ResultTable columnData={columnData} />);
      expect(elements('col')).toHaveLength(columnNames.length);
    });

    it('applies the right style to each col element', () => {
      render(
        <ResultTable columnData={columnData} dataType={dataType} />
      );
      const colElements = elements('col');
      expect(colElements[0].classList).toContain(
        `table__${dataType}-column--${
          columnData[columnNames[0]].classMod
        }`
      );
      expect(colElements[1].classList).toContain(
        `table__${dataType}-column--${
          columnData[columnNames[1]].classMod
        }`
      );
    });
  });

  describe('header', () => {
    it('is rendered with the #tableHeader tr element within a thead element', () => {
      render(<ResultTable />);
      expect(element('thead tr#tableHeaders')).not.toBeNull();
    });

    it('contains a th element for each column', () => {
      render(
        <ResultTable columnData={columnData} dataType={dataType} />
      );
      expect(elements('thead tr#tableHeaders th')).toHaveLength(
        columnNames.length
      );
    });

    it('renders an anchor element header cells when there is no "expand" column', () => {
      render(
        <ResultTable columnData={columnData} dataType={dataType} />
      );
      expect(elements('thead tr#tableHeaders th a')).toHaveLength(
        columnNames.length
      );
    });

    it('does not render an anchor element for "expand" columns within th cells', () => {
      const columnDataWithExpandColumn = { expand: {} };
      render(
        <ResultTable
          columnData={columnDataWithExpandColumn}
          dataType={dataType}
        />
      );
      expect(elements('thead tr#tableHeaders th a')).toHaveLength(0);
    });

    it('renders the column label text within the anchor element', () => {
      render(
        <ResultTable columnData={columnData} dataType={dataType} />
      );

      const headerTextLinks = elements('thead tr#tableHeaders th a');
      expect(headerTextLinks[0].textContent).toContain(
        columnData[columnNames[0]].label
      );
      expect(headerTextLinks[1].textContent).toContain(
        columnData[columnNames[1]].label
      );
    });

    it('returns column name when header text is clicked', () => {
      const headerClickSpy = jest.fn();
      render(
        <ResultTable
          columnData={columnData}
          dataType={dataType}
          handleHeaderClick={headerClickSpy}
        />
      );

      const headerTextLinks = elements('thead tr#tableHeaders th a');
      click(headerTextLinks[0]);

      expect(headerClickSpy).toHaveBeenCalledWith(columnNames[0]);
    });

    it('adds a downward arrow next to the header text when sorting by that column in ascending order', () => {
      const sortBy = {
        column: columnNames[0],
        order: 'ascending',
      };
      render(<ResultTable columnData={columnData} sortBy={sortBy} />);

      const downwardArrow = element(
        'thead th:first-child i.down-arrow'
      );
      expect(downwardArrow).not.toBeNull();
    });

    it('adds an upward arrow next to the header text when sorting by that column in descending order', () => {
      const sortBy = {
        column: columnNames[0],
        order: 'descending',
      };
      render(<ResultTable columnData={columnData} sortBy={sortBy} />);

      const upwardArrow = element('thead th:first-child i.up-arrow');
      expect(upwardArrow).not.toBeNull();
    });
  });

  it('does not render an arrow next to column headers by default', () => {
    render(<ResultTable columnData={columnData} />);

    const arrows = elements('thead th:first-child i');
    expect(arrows).toHaveLength(0);
  });

  describe('body', () => {
    it('contains a tbody element', () => {
      render(<ResultTable />);

      expect(element('tbody')).not.toBeNull();
    });

    it('contains a row element for each search result', () => {
      render(
        <ResultTable
          columnData={columnData}
          dataType={dataType}
          results={results}
        />
      );

      expect(elements('tbody tr')).toHaveLength(results.length);
    });

    it('renders a td cell for each data field within each row by default', () => {
      render(
        <ResultTable
          columnData={columnData}
          dataType={dataType}
          results={results}
        />
      );

      const firstDataRow = elements('tbody tr:first-child td');
      const secondDataRow = elements('tbody tr:nth-child(2) td');
      expect(firstDataRow).toHaveLength(Object.keys(results).length);
      expect(secondDataRow).toHaveLength(Object.keys(results).length);
    });

    it('does not render a td cell for "id" fields', () => {
      const resultWithIdProperty = [{ id: 1 }];
      render(<ResultTable results={resultWithIdProperty} />);
      const rowDataCells = elements('tbody tr:first-child td');
      expect(rowDataCells.length).toEqual(0);
    });

    it('displays the text content of the data in each cell by default', () => {
      render(
        <ResultTable
          columnData={columnData}
          dataType={dataType}
          results={results}
        />
      );

      const rowDataCells = elements('tbody tr:first-child td');
      expect(rowDataCells[0].textContent).toEqual(
        results[0][resultFieldNames[0]]
      );
      expect(rowDataCells[1].textContent).toEqual(
        results[0][resultFieldNames[1]]
      );
    });

    it('renders the expand icon in expand column cells', () => {
      const columnDataWithExpand = {
        expand: {
          label: '',
          classMod: 'expand',
        },
        ...columnData,
      };
      render(
        <ResultTable
          columnData={columnDataWithExpand}
          dataType={dataType}
          results={results}
        />
      );

      const firstRowExpandIcon = element(
        'tbody tr:first-child td svg.btn-expand'
      );
      const secondRowExpandIcon = element(
        'tbody tr:nth-child(2) td svg.btn-expand'
      );
      expect(firstRowExpandIcon).not.toBeNull();
      expect(secondRowExpandIcon).not.toBeNull();
    });

    it('returns the the row data when the expand icon is clicked', () => {
      const columnDataWithExpand = {
        expand: {
          label: '',
          classMod: 'expand',
        },
        ...columnData,
      };
      const resultWithIdProperty = [{ id: 1, val: 'val' }];
      const iconClickSpy = jest.fn();
      render(
        <ResultTable
          handleExpandIconClick={iconClickSpy}
          columnData={columnDataWithExpand}
          dataType={dataType}
          results={resultWithIdProperty}
        />
      );

      const expandIcon = element(
        'tbody tr:first-child td svg.btn-expand'
      );
      click(expandIcon);

      expect(iconClickSpy).toHaveBeenCalledWith(
        resultWithIdProperty[0]
      );
    });

    it('renders a read-only checkbox within isSecular cells', () => {
      const resultWithISSecular = [{ isSecular: true }];
      render(<ResultTable results={resultWithISSecular} />);

      const isSecularCellCheckbox = element(
        'tbody tr:first-child td input[type="checkbox"]'
      );
      expect(isSecularCellCheckbox).not.toBeNull();
      expect(isSecularCellCheckbox.disabled).toEqual(true);
    });

    it('checks off isSecular checkbox when true, and does not when false', () => {
      const resultWithISSecular = [
        { isSecular: 'true' },
        { isSecular: 'false' },
      ];
      render(<ResultTable results={resultWithISSecular} />);

      const isSecularCellCheckboxes = elements(
        'tbody td input[type="checkbox"]'
      );
      expect(isSecularCellCheckboxes[0].checked).toEqual(true);
      expect(isSecularCellCheckboxes[1].checked).toEqual(false);
    });

    it('adds the "u-retain-indentation" class modifier to cells with field names "inscription" or "description"', () => {
      const inscriptionDescriptionResult = [
        {
          ...results[0],
          inscription: 'insc',
          description: 'desc',
        },
      ];
      render(
        <ResultTable
          columnData={columnData}
          dataType={dataType}
          results={inscriptionDescriptionResult}
        />
      );

      const rowDataCells = elements('tbody tr:first-child td');
      expect(rowDataCells[2].classList).toContain(
        'u-retain-indentation'
      );
      expect(rowDataCells[3].classList).toContain(
        'u-retain-indentation'
      );
    });

    it('does not add the "u-retain-indentation" class modifier to cells by default', () => {
      render(
        <ResultTable
          columnData={columnData}
          dataType={dataType}
          results={results}
        />
      );

      const rowDataCells = elements('tbody tr:first-child td');
      expect(rowDataCells[0].classList).not.toContain(
        'u-retain-indentation'
      );
      expect(rowDataCells[1].classList).not.toContain(
        'u-retain-indentation'
      );
    });

    it('returns the row id and column name of the data cell double-clicked', () => {
      const dblClickSpy = jest.fn();
      const resultRowWithId = [{ id: 999, col1: '', col2: '' }];
      render(
        <ResultTable
          columnData={columnData}
          dataType={dataType}
          results={resultRowWithId}
          handleCellDoubleClick={dblClickSpy}
        />
      );
      const rowCells = elements('tbody tr:first-child td');
      dblClick(rowCells[0]);

      expect(dblClickSpy).toHaveBeenCalledWith(
        resultRowWithId[0],
        'col1'
      );
    });
  });
});

describe('resultTableHelpers', () => {
  const resultsPerPage = 5;

  //create 5 pages worth of results, where the last page is not full
  const pages = 5;
  const resultQuantity = resultsPerPage * pages - 3;
  const results = new Array(resultQuantity);
  results.fill(0);
  results.forEach((_, index) => (results[index] = index));

  const lastResult = (segment) => segment[segment.length - 1];

  describe('resultSegment', () => {
    it('returns the right results when viewing first page of multiple pages', () => {
      const pageNumber = 1;
      let segment = resultSegment(
        results,
        resultsPerPage,
        pageNumber
      );

      expect(segment[0]).toEqual(0);
      expect(lastResult(segment)).toEqual(resultsPerPage - 1);
    });

    it('returns the right results when viewing an inner page', () => {
      const pageNumber = 3;
      let segment = resultSegment(
        results,
        resultsPerPage,
        pageNumber
      );

      expect(segment[0]).toEqual(10);
      expect(lastResult(segment)).toEqual(14);
    });

    it('returns the right results when viewing the last page', () => {
      const pageNumber = 5;
      let segment = resultSegment(
        results,
        resultsPerPage,
        pageNumber
      );
      expect(segment[0]).toEqual(20);
      expect(lastResult(segment)).toEqual(21);
    });
  });
});

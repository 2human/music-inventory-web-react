import React from 'react';
import { expectRedux } from 'expect-redux';
import { createContainerWithStore } from '../domManipulators';
import { createConnectorShallowRenderer } from '../shallowHelpers';
import {
  ConnectedResultTable,
  mapDispatchToProps,
  mapStateToProps,
} from '../../components/SearchResults/ResultTable/ConnectedResultTable';
import { ResultTable } from '../../components/SearchResults/ResultTable/ResultTable';
import {
  openEditRow,
  openViewRow,
  searchSetSortOrder,
  searchSetSortOrderAndSort,
} from '../../store/actions';
import { sampleResults } from '../../components/SearchResults/ResultTable/sampleResults';
import { itMapsStateToPropsWhenNoOwnProps } from '../connectorHelpers';
import { resultSegment } from '../../components/SearchResults/ResultTable/resultTableHelpers';

describe('ConnectedResultTable', () => {
  let renderWithStore, elements, element, click, store, dblClick;

  let shallowRenderConnector, connectedChild;

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
    { id: 998, col1: 'row1col1data', col2: 'row1col2data' },
    { id: 999, col1: 'row2col1data', col2: 'row2col2data' },
  ];

  beforeEach(() => {
    ({ renderWithStore, elements, element, click, store, dblClick } =
      createContainerWithStore());
    ({ shallowRenderConnector, connectedChild } =
      createConnectorShallowRenderer());
  });

  it('connects the ResultTable component', () => {
    shallowRenderConnector(<ConnectedResultTable />);
    expect(connectedChild()).toEqual(ResultTable);
  });

  it('dispatches the openEditRow action when double-clicking a data cell', () => {
    renderWithStore(
      <ConnectedResultTable
        columnData={columnData}
        dataType={dataType}
        results={results}
      />
    );

    const rowCells = elements('tbody tr:first-child td');
    dblClick(rowCells[0]);

    return expectRedux(store)
      .toDispatchAnAction()
      .matching(openEditRow(results[0], columnNames[0]));
  });

  it('dispatches the openViewRow action when clicking an expand icon', () => {
    const columnDataWithExpand = {
      expand: {
        label: '',
        classMod: 'expand',
      },
      ...columnData,
    };
    const resultWithIdProperty = [{ id: 1 }];
    renderWithStore(
      <ConnectedResultTable
        columnData={columnDataWithExpand}
        dataType={dataType}
        results={resultWithIdProperty}
      />
    );

    const expandIcon = element(
      'tbody tr:first-child td svg.btn-expand'
    );
    click(expandIcon);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(openViewRow(resultWithIdProperty[0]));
  });

  it('returns column name when header text is clicked', () => {
    renderWithStore(
      <ConnectedResultTable
        columnData={columnData}
        dataType={dataType}
      />
    );

    const headerTextLinks = elements('thead tr#tableHeaders th a');
    click(headerTextLinks[0]);

    return expectRedux(store)
      .toDispatchAnAction()
      .matching(searchSetSortOrder(columnNames[0]));
  });

  describe('mapDispatchToProps', () => {
    const state = {
      search: {
        columnData: {
          dataType1: {
            col1: 'col1',
          },
        },
        dataType: 'dataType1',
        results: sampleResults.entries,
        resultsPerPage: 5,
        currentPage: 3,
      },
    };

    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'columnData',
      state.search.columnData[state.search.dataType]
    );

    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'dataType',
      state.search.dataType
    );

    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'results',
      resultSegment(
        state.search.results,
        state.search.resultsPerPage,
        state.search.currentPage
      )
    );

    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'sortBy',
      state.search.sortBy
    );

    const ownProps = {
      columnData: 'columndata',
      dataType: 'datatype',
      results: ['result1', 'result2'],
      sortBy: { column: 'col', order: 'ord' },
    };

    it('maps ownProps to props when ownProps are defined', () => {
      expect(mapStateToProps(state, ownProps)).toMatchObject({
        ...ownProps,
      });
    });
  });

  describe('mapDispatchToProps', () => {
    it('maps the openEditRow action to handleCellDoubleClick', () => {
      expect(mapDispatchToProps).toMatchObject({
        handleCellDoubleClick: openEditRow,
      });
    });

    it('maps the openViewRow action to handleExpandIconClick', () => {
      expect(mapDispatchToProps).toMatchObject({
        handleExpandIconClick: openViewRow,
      });
    });

    it('maps the searchSetSortAndSort action to handleHeaderClick', () => {
      expect(mapDispatchToProps).toMatchObject({
        handleHeaderClick: searchSetSortOrderAndSort,
      });
    });
  });
});

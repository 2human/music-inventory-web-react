import { storeSpy, expectRedux } from 'expect-redux';
import { configureStore } from '../../../store';
import {
  searchSelectPage,
  searchSetSortOrder,
  searchSetSortOrderAndSort,
  searchSort,
} from '../../../store/actions';

describe('setSortOrderAndSort', () => {
  let store;

  const column = 'columnName';

  beforeEach(() => {
    store = configureStore([storeSpy]);
  });

  const dispatchSetSortAndSort = (column) =>
    store.dispatch(searchSetSortOrderAndSort(column));

  it('sets the sort order', () => {
    dispatchSetSortAndSort(column);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(searchSetSortOrder(column));
  });

  it('sorts the data', () => {
    dispatchSetSortAndSort(column);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(searchSort());
  });

  it('resets page number to page 1', () => {
    dispatchSetSortAndSort(column);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(searchSelectPage(1));
  });
});

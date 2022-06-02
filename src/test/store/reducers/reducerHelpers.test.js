import {
  sortProperties,
  sortResults,
} from '../../../store/reducers/reducerHelpers';

describe('reducerHelpers', () => {
  describe('sortProperties', () => {
    it('sorts the column in ascending order when oldSortBy is undefined', () => {
      const oldSortBy = undefined;
      const column = 'col1';
      expect(sortProperties(oldSortBy, column)).toMatchObject({
        column,
        order: 'ascending',
      });
    });

    it('sorts the column by descending if sorting by same column', () => {
      const column = 'col1';
      const oldSortBy = { column, order: 'ascending' };
      expect(sortProperties(oldSortBy, column)).toMatchObject({
        column,
        order: 'descending',
      });
    });

    it('sorts the column in ascending order if old column is defined and sorting by new column', () => {
      const column = 'col1';
      const oldSortBy = { column: 'col2', order: 'ascending' };
      expect(sortProperties(oldSortBy, column)).toMatchObject({
        column,
        order: 'ascending',
      });
    });
  });

  describe('sortResults', () => {
    it('sorts the results in ascending order when sortBy order is ascending', () => {
      const results = [
        { col1: 'data2' },
        { col1: 'data1' },
        { col1: 'data3' },
      ];
      const sortBy = { column: 'col1', order: 'ascending' };
      expect(sortResults(results, sortBy)[0].col1).toEqual('data1');
      expect(sortResults(results, sortBy)[2].col1).toEqual('data3');
    });

    it('sorts the results in descending order when sortBy order is descending', () => {
      const results = [
        { col1: 'data2' },
        { col1: 'data1' },
        { col1: 'data3' },
      ];
      const sortBy = { column: 'col1', order: 'descending' };
      expect(sortResults(results, sortBy)[0].col1).toEqual('data3');
      expect(sortResults(results, sortBy)[2].col1).toEqual('data1');
    });

    it('sorts results by the collection column second when sortBy columns are equal', () => {
      const resultsWithCollection = [
        { col1: 'data1', collection: 'coll2' },
        { col1: 'data1', collection: 'coll3' },
        { col1: 'data1', collection: 'coll1' },
      ];

      const sortByAsc = { column: 'col1', order: 'ascending' };
      expect(
        sortResults(resultsWithCollection, sortByAsc)[0].collection
      ).toEqual('coll1');
      expect(
        sortResults(resultsWithCollection, sortByAsc)[2].collection
      ).toEqual('coll3');

      const sortByDesc = { column: 'col1', order: 'descending' };
      expect(
        sortResults(resultsWithCollection, sortByDesc)[0].collection
      ).toEqual('coll3');
      expect(
        sortResults(resultsWithCollection, sortByDesc)[2].collection
      ).toEqual('coll1');
    });

    it('sorts results by the sourceNumber column third when sortBy and collection columns are equal', () => {
      const resultsWithCollectionSourceNum = [
        { col1: 'data1', collection: 'coll1', sourceNumber: 'src2' },
        { col1: 'data1', collection: 'coll1', sourceNumber: 'src3' },
        { col1: 'data1', collection: 'coll1', sourceNumber: 'src1' },
      ];

      const sortByAsc = { column: 'col1', order: 'ascending' };
      expect(
        sortResults(resultsWithCollectionSourceNum, sortByAsc)[0]
          .sourceNumber
      ).toEqual('src1');
      expect(
        sortResults(resultsWithCollectionSourceNum, sortByAsc)[2]
          .sourceNumber
      ).toEqual('src3');

      const sortByDesc = { column: 'col1', order: 'descending' };
      expect(
        sortResults(resultsWithCollectionSourceNum, sortByDesc)[0]
          .sourceNumber
      ).toEqual('src3');
      expect(
        sortResults(resultsWithCollectionSourceNum, sortByDesc)[2]
          .sourceNumber
      ).toEqual('src1');
    });
  });
});

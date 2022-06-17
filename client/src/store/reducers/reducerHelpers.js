/**
 *
 * @param {*} oldSortProps Previous sort properties.
 * @param {*} column Column to sort data by.
 * @returns Object containing column to sort data by, and the order to sort in.
 */
export const sortProperties = (oldSortProps, column) => {
  if (
    oldSortProps !== undefined &&
    oldSortProps.column === column &&
    oldSortProps.order === 'ascending'
  ) {
    return { column, order: 'descending' };
  }
  return { column, order: 'ascending' };
};

const isSourceOrEntry = (dataPoint) =>
  dataPoint.sourceNumber !== undefined;

const sortAscending = (a, b, column) => {
  if (a[column] < b[column]) return -1;
  if (a[column] > b[column]) return 1;

  //use collection column as secondary when primary are equal
  if (a.collection < b.collection) return -1;
  if (a.collection > b.collection) return 1;

  //use source number as tertiary when others are both equal
  if (isSourceOrEntry(a)) {
    if (a.sourceNumber < b.sourceNumber) return -1;
    if (a.sourceNumber > b.sourceNumber) return 1;
  }
};

const sortDescending = (a, b, column) => {
  if (a[column] > b[column]) return -1;
  if (a[column] < b[column]) return 1;

  //use collection column as secondary when primary are equal
  if (a.collection > b.collection) return -1;
  if (a.collection < b.collection) return 1;

  //use source number as tertiary when others are both equal
  if (isSourceOrEntry(a)) {
    if (a.sourceNumber > b.sourceNumber) return -1;
    if (a.sourceNumber < b.sourceNumber) return 1;
  }
};

/**
 *
 * @param {*} results Result data
 * @param {*} sortBy Properties for how to sort data
 * @returns Results sorted according to search properties
 */
export const sortResults = (results, sortBy) => {
  if (!sortBy) return results;
  return [...results].sort((a, b) =>
    sortBy.order === 'ascending'
      ? sortAscending(a, b, sortBy.column)
      : sortDescending(a, b, sortBy.column)
  );
};

/**
 *
 * @param {*} value
 * @param {*} currentPage
 * @returns
 */
export const selectedResultPage = (value, currentPage) => {
  switch (value) {
    case 'Previous':
      return --currentPage;
    case 'Next':
      return ++currentPage;
    default:
      return value;
  }
};

/**
 * Updates result set according to the updateType and data input.
 * @param {*} updateType How results were changed.
 * @param {*} oldResults Previous result set.
 * @param {*} data Data relevent to update.
 * @returns
 */
export const updatedResults = (updateType, oldResults, data) => {
  switch (updateType) {
    case 'edit':
      return oldResults.map((result) =>
        result.id === data.id ? data : result
      );
    case 'delete':
      return oldResults.filter((result) => result.id !== data.id);
    case 'create':
      return [...oldResults, data];
    default:
      return oldResults;
  }
};

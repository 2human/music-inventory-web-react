import React from 'react';
import { columnData } from './ResultTable/columnData';
import { ResultTable } from './ResultTable/ResultTable';
import { sampleResults } from './ResultTable/sampleResults';

const sortBy = { column: 'collection', order: 'ascending' };

export const SearchResults = () => (
  <section className="section-search-results">
    <ResultTable
      columnData={columnData.entries}
      results={sampleResults.entries}
      dataType={'entries'}
      sortBy={sortBy}
    />
  </section>
);

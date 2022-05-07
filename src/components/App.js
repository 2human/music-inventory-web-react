import React from 'react';
import { Navigation } from './Navigation/Navigation';
import { advancedSearchFields } from './SearchForm/form-fields/advancedSearch';
import { tableSelectFields } from './SearchForm/form-fields/tableSelect';
import { basicSearchFields } from './SearchForm/form-fields/basicSearch';
import { ConnectedSearchForm } from './SearchForm/ConnectedSearchForm';
import { ResultTable } from './SearchResults/ResultTable/ResultTable';
import { columnData } from './SearchResults/ResultTable/columnData';
import { SearchResults } from './SearchResults/SearchResults';
import { sampleResults } from './SearchResults/ResultTable/sampleResults';

function App() {
  return (
    <div className="App">
      <Navigation />
      <ConnectedSearchForm
        basicSearchFields={basicSearchFields}
        tableSelectFields={tableSelectFields}
        advancedSearchFields={advancedSearchFields}
        initialTable={'sources'}
      />
      <SearchResults />
    </div>
  );
}

export default App;

import React from 'react';
import { Navigation } from './Navigation/Navigation';
import { SearchForm } from './SearchForm/SearchForm';
import { advancedSearchFields } from './SearchForm/form-fields/advancedSearch';
import { tableSelectFields } from './SearchForm/form-fields/tableSelect';
import { basicSearchFields } from './SearchForm/form-fields/basicSearch';

function App() {
  return (
    <div className="App">
      <Navigation />
      <SearchForm
        basicSearchFields={basicSearchFields}
        tableSelectFields={tableSelectFields}
        advancedSearchFields={advancedSearchFields}
        initialTable={'sources'}
      />
    </div>
  );
}

export default App;

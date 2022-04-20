import React from 'react';
import { Navigation } from './Navigation/Navigation';
import { SearchForm } from './SearchForm/SearchForm';
import { advancedSearchFields } from '../assets/form-fields/search-form/advancedSearch';
import { tableSelectFields } from '../assets/form-fields/search-form/tableSelect';
import { basicSearchFields } from '../assets/form-fields/search-form/basicSearch';

function App() {
  return (
    <div className="App">
      <Navigation />
      <SearchForm
        basicSearchFields={basicSearchFields}
        tableSelectFields={tableSelectFields}
        advancedSearchFields={advancedSearchFields}
      />
    </div>
  );
}

export default App;

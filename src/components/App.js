import React from 'react';
import { Navigation } from './Navigation/Navigation';
import { SearchForm } from './SearchForm/SearchForm';
import {
  fieldOptions,
  tableOptions,
  advancedSearchFields,
} from '../assets/form-fields/formFieldData';

function App() {
  return (
    <div className="App">
      <Navigation />
      <SearchForm
        fieldOptions={fieldOptions}
        tableOptions={tableOptions}
        advancedSearchFields={advancedSearchFields}
      />
    </div>
  );
}

export default App;

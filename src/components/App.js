import React from 'react';
import { Navigation } from './Navigation/Navigation';
import { ConnectedSearchForm } from './SearchForm/ConnectedSearchForm';
import { ConnectedSearchResults } from './SearchResults/ConnectedSearchResults';

function App() {
  return (
    <div className="App">
      <Navigation />
      {/* <ConnectedSearchForm />
      <ConnectedSearchResults /> */}
    </div>
  );
}

export default App;

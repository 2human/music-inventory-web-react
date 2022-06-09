import React from 'react';
import { Navigation } from './Navigation/Navigation';
import { ConnectedSearchForm } from './SearchForm/ConnectedSearchForm';
import { ConnectedSearchResults } from './SearchResults/ConnectedSearchResults';
import { SingleRowForm } from './SingleRowForm/SingleRowForm';

const singleRowformData = [
  { name: 'collection', label: 'Collection' },
  { name: 'sourceNumber', label: 'Source Number' },
  { name: 'callNumber', label: 'Call Number' },
  { name: 'author', label: 'Author' },
  { name: 'title', label: 'Title' },
  { name: 'inscription', label: 'Inscriptions' },
  { name: 'description', label: 'Description' },
];

function App() {
  return (
    <div className="App">
      <Navigation />
      {/* <ConnectedSearchForm />
      <ConnectedSearchResults /> */}
      <SingleRowForm
        fields={singleRowformData}
        data={{ title: 'title' }}
        status={'SUBMITTING'}
      />
    </div>
  );
}

export default App;

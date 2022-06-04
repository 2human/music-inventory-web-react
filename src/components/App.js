import React from 'react';
import { Navigation } from './Navigation/Navigation';
import { ConnectedSearchForm } from './SearchForm/ConnectedSearchForm';
import { ConnectedSearchResults } from './SearchResults/ConnectedSearchResults';
import { SingleRowForm } from './SingleRowForm/SingleRowForm';

const singleRowformData = [
  { name: 'collection', label: 'Collection' },
  { name: 'sourceNumber', label: 'Source Number' },
  { name: 'location', label: 'Location' },
  { name: 'title', label: 'Title' },
  { name: 'composer', label: 'Composer' },
  { name: 'vocalPart', label: 'Vocal Part' },
  { name: 'key', label: 'Key' },
  { name: 'melodicIncpit', label: 'Melodic Incipit' },
  { name: 'textIncipit', label: 'Text Incipit' },
  { name: 'isSecular', label: 'Secular' },
  { name: 'notes', label: 'Notes' },
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
      />
    </div>
  );
}

export default App;

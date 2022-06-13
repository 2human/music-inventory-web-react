import React from 'react';
import Modal from './Modal/Modal';
import { ConnectedModalController } from './Modal/ModalController/ConnectedModalController';
import { Navigation } from './Navigation/Navigation';
import { ConnectedSearchForm } from './SearchForm/ConnectedSearchForm';
import { ConnectedSearchResults } from './SearchResults/ConnectedSearchResults';
import { SingleRowForm } from './SingleRowForm/SingleRowForm';

const singleRowformData = [
  { name: 'collection', label: 'Collection' },
  { name: 'description', label: 'Description' },
];

function App() {
  return (
    <div className="App">
      <Navigation />
      <ConnectedSearchForm />
      <ConnectedSearchResults />
      <ConnectedModalController />
    </div>
  );
}

export default App;

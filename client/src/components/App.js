import React from 'react';
import { ConnectedCreateRowDropdown } from './CreateRowDropdown/ConnectedCreateRowDropdown';
import { Dropdown } from './Dropdown/Dropdown';
import Modal from './Modal/Modal';
import { ConnectedModalController } from './Modal/ModalController/ConnectedModalController';
import { Navigation } from './Navigation/Navigation';
import { ConnectedSearchForm } from './SearchForm/ConnectedSearchForm';
import { ConnectedSearchResults } from './SearchResults/ConnectedSearchResults';
import { SingleRowForm } from './SingleRowForm/SingleRowForm';

const links = [
  { name: 'Collection', value: 'collections' },
  { name: 'Source', value: 'sources' },
  { name: 'Entry', value: 'entries' },
];

function App() {
  return (
    <div className="App">
      <ConnectedCreateRowDropdown />
      <Navigation />
      <ConnectedSearchForm />
      <ConnectedSearchResults />
      <ConnectedModalController />
    </div>
  );
}

export default App;

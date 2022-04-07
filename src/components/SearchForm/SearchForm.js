import React, { useState, useEffect } from 'react';
import { TableSelect } from './TableSelect';


export const SearchForm = () => {  
  const [keywords, setKeywords] = useState("");
  const [selectedTable, setSelectedTable] = useState("sources");

  useEffect(() => {
  })

  const handleSubmit = event => {
    event.preventDefault();
  };

  const handleKeywordInput = ({ target }) => {
    setKeywords(target.value);
  };
  
  const handleTableChange = ({ target }) => {
    setSelectedTable(target.value);
  }

  const tableOptions = [
    {
      name: 'collections',
      label: 'Collections'
    },
    {
      name: 'sources',
      label: 'Sources'
    },
    {
      name: 'entries',
      label: 'Entries'
    }
  ];

  return (
    <form id="searchForm"
    className="search-form"
    onSubmit={handleSubmit}
    >

      <KeywordInputAndSubmitContainer>
        <KeywordInput 
          handleKeywordInput={handleKeywordInput}
          value={keywords} />
        <SubmitSearchButton />  
      </KeywordInputAndSubmitContainer>   

      <TableSelect 
        tableOptions={tableOptions}
        selectedTable={selectedTable}
        handleTableChange={handleTableChange} />

      <FieldSelectContainer>

      </FieldSelectContainer>

    </form>
  );
};

const KeywordInputAndSubmitContainer = ({ children }) => (
  <div 
    className="search-form__keyword-container u-margin-bottom-small"
  >
    {children}
  </div>
);

const KeywordInput = ({ handleKeywordInput, keywords }) => (  
  <input 
    autoFocus="autofocus"
    name="searchText" 
    id="keywordInput" 
    className="form__input search-form__keyword-input" 
    placeholder="Keyword(s)" 
    size="60" 
    maxLength="200" 
    onChange={handleKeywordInput}
    value={keywords}
  />
)

const SubmitSearchButton = () => 
  <input 
    id="submitSearch"
    type="submit"
    className="btn btn--blue"
    value="Search" />;



const FieldSelectContainer = ({ children }) => 
  <div className="search-form__basic-search">{children}</div>;


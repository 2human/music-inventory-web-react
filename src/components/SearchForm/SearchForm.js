import React, { useState, useEffect } from 'react';
import { TableSelect } from './TableSelect';
import { FieldSelect } from './FieldSelect';
import { fieldOptions, tableOptions } from './formInputObjects';

export const SearchForm = () => {
  const [keywords, setKeywords] = useState('');
  const [selectedTable, setSelectedTable] = useState('sources');
  const [selectedFields, setSelectedFields] = useState([]);

  useEffect(() => {});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestURL = getRequestURL();

    const result = await window.fetch(requestURL.href);
    if (result.ok) {
      const searchResults = await result.json();
    }
  };

  const getRequestURL = () => {
    const requestURL = new URL(
      `http://localhost:8080/${selectedTable}`
    );
    requestURL.searchParams.set('searchText', keywords);
    requestURL.searchParams.set('table', selectedTable);
    selectedFields.forEach((field) =>
      requestURL.searchParams.append('field', field)
    );
    return requestURL;
  };

  const handleKeywordInput = ({ target }) => {
    setKeywords(target.value);
  };

  const handleTableChange = ({ target }) => {
    setSelectedTable(target.value);
  };

  const handleFieldChange = ({ target }) => {
    const changedField = target.value;
    if (wasAlreadySelected(changedField)) {
      setSelectedFields(
        selectedFields.filter((field) => field !== changedField)
      );
    } else {
      setSelectedFields([...selectedFields, changedField]);
    }
  };

  const wasAlreadySelected = (field) => {
    return selectedFields.some(
      (selectedField) => selectedField === field
    );
  };

  return (
    <form
      id="searchForm"
      className="search-form"
      onSubmit={handleSubmit}>
      <KeywordInputAndSubmitContainer>
        <KeywordInput
          handleKeywordInput={handleKeywordInput}
          value={keywords}
        />
        <SubmitSearchButton />
      </KeywordInputAndSubmitContainer>

      <TableSelect
        tableOptions={tableOptions}
        selectedTable={selectedTable}
        handleTableChange={handleTableChange}
      />

      <FieldSelect
        handleFieldChange={handleFieldChange}
        fieldOptions={fieldOptions}
        selectedFields={selectedFields}
      />
    </form>
  );
};

const KeywordInputAndSubmitContainer = ({ children }) => (
  <div className="search-form__keyword-container u-margin-bottom-small">
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
);

const SubmitSearchButton = () => (
  <input
    id="submitSearch"
    type="submit"
    className="btn btn--blue"
    value="Search"
  />
);

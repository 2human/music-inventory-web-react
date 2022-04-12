import React, { useState, useEffect } from 'react';
import { TableSelect } from './TableSelect';
import { FieldSelect } from './FieldSelect';
import { fieldOptions, tableOptions } from './formInputObjects';

export const SearchForm = () => {
  const [formInputs, setFormInputs] = useState({
    searchText: '',
    table: 'sources',
    selectedFields: [],
  });

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
      `http://localhost:8080/${formInputs.table}`
    );
    requestURL.searchParams.set('searchText', formInputs.searchText);
    requestURL.searchParams.set('table', formInputs.table);
    formInputs.selectedFields.forEach((field) =>
      requestURL.searchParams.append('field', field)
    );
    return requestURL;
  };

  const handleKeywordInput = ({ target }) => {
    setFormInputs({
      ...formInputs,
      searchText: target.value,
    });
  };

  const handleTableChange = ({ target }) => {
    setFormInputs({
      ...formInputs,
      table: target.value,
    });
  };

  const handleFieldChange = ({ target }) => {
    const changedField = target.value;
    if (wasAlreadySelected(changedField)) {
      deselectField(changedField);
    } else {
      selectField(changedField);
    }
  };

  const wasAlreadySelected = (field) => {
    return formInputs.selectedFields.some(
      (selectedField) => selectedField === field
    );
  };

  const deselectField = (changedField) => {
    setFormInputs({
      ...formInputs,
      selectedFields: formInputs.selectedFields.filter(
        (field) => field !== changedField
      ),
    });
  };

  const selectField = (changedField) => {
    setFormInputs({
      ...formInputs,
      selectedFields: [...formInputs.selectedFields, changedField],
    });
  };

  return (
    <form
      id="searchForm"
      className="search-form"
      onSubmit={handleSubmit}>
      <KeywordInputAndSubmitContainer>
        <KeywordInput
          handleKeywordInput={handleKeywordInput}
          value={formInputs.searchText}
        />
        <SubmitSearchButton />
      </KeywordInputAndSubmitContainer>

      <TableSelect
        tableOptions={tableOptions}
        selectedTable={formInputs.table}
        handleTableChange={handleTableChange}
      />

      <FieldSelect
        handleFieldChange={handleFieldChange}
        fieldOptions={fieldOptions}
        selectedFields={formInputs.selectedFields}
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

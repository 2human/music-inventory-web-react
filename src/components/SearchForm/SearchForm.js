import React, { useState, useEffect } from 'react';
import { TableSelectRadios } from './TableSelectRadios';
import { FieldSelectCheckboxes } from './FieldSelectCheckboxes';
import { AdvancedSearchTextInputs } from './AdvancedSearchTextInputs';

export const SearchForm = ({
  fieldOptions,
  tableOptions,
  advancedSearchFields,
}) => {
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
      <KeywordInputAndSubmitBtn
        handleKeywordInput={handleKeywordInput}
        value={formInputs.searchText}
      />
      <span
        id="advancedSearchToggle"
        className="btn-text btn-text__advanced-search">
        Open Advanced Search
        <i className="down-arrow btn-text__down-arrow"></i>
      </span>

      <TableSelectRadios
        tableOptions={tableOptions}
        selectedTable={formInputs.table}
        handleTableChange={handleTableChange}
      />

      <FieldSelectCheckboxes
        handleFieldChange={handleFieldChange}
        fieldOptions={fieldOptions}
        selectedFields={formInputs.selectedFields}
      />

      <AdvancedSearchTextInputs
        fields={advancedSearchFields.sources}
      />
    </form>
  );
};

const KeywordInputAndSubmitBtn = ({ handleKeywordInput, value }) => (
  <KeywordInputAndSubmitContainer>
    <KeywordInput
      handleKeywordInput={handleKeywordInput}
      value={value}
    />
    <SubmitSearchButton />
  </KeywordInputAndSubmitContainer>
);

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

SearchForm.defaultProps = {
  advancedSearchFields: {
    sources: {
      data: [],
      rows: [],
    },
  },
};

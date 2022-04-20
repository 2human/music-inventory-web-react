import React, { useState, useEffect } from 'react';
import { TableSelectRadios } from './TableSelectRadios';
import { BasicSearchCheckboxes } from './BasicSearchCheckboxes';
import { AdvancedSearchTextInputs } from './AdvancedSearchTextInputs';
import { blankAdvancedInputs } from '../../assets/form-fields/search-form/advancedSearch';

export const SearchForm = ({
  basicSearchFields,
  tableSelectFields,
  advancedSearchFields,
}) => {
  const [formInputs, setFormInputs] = useState({
    searchText: '',
    table: 'sources',
    basicSearchSelection: [],
    advancedSearchInputs: {
      ...blankAdvancedInputs(advancedSearchFields['sources'].rows),
    },
  });

  const [advancedSearchOn, setAdvancedSearchOn] = useState(false);

  useEffect(() => {});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await window.fetch(requestURLObject().href);
    if (result.ok) {
      const searchResults = await result.json();
    }
  };

  const requestURLObject = () => {
    const requestURL = new URL(
      `http://localhost:8080/${formInputs.table}`
    );
    requestURL.searchParams.set('searchText', formInputs.searchText);
    requestURL.searchParams.set('table', formInputs.table);
    if (advancedSearchOn) {
      const advancedInputs = formInputs.advancedSearchInputs;
      Object.keys(advancedInputs).forEach((field) =>
        requestURL.searchParams.append(field, advancedInputs[field])
      );
    } else {
      formInputs.basicSearchSelection.forEach((field) =>
        requestURL.searchParams.append('field', field)
      );
    }
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
    return formInputs.basicSearchSelection.includes(field);
  };

  const deselectField = (changedField) => {
    setFormInputs({
      ...formInputs,
      basicSearchSelection: formInputs.basicSearchSelection.filter(
        (field) => field !== changedField
      ),
    });
  };

  const selectField = (changedField) => {
    setFormInputs({
      ...formInputs,
      basicSearchSelection: [
        ...formInputs.basicSearchSelection,
        changedField,
      ],
    });
  };

  const handleAdvancedSearchToggle = () => {
    setAdvancedSearchOn(!advancedSearchOn);
  };

  const handleAdvancedInput = ({ target }) => {
    setFormInputs({
      ...formInputs,
      advancedSearchInputs: {
        ...formInputs.advancedSearchInputs,
        [target.name]: target.value,
      },
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

      <AdvancedSearchToggle
        advancedSearchOn={advancedSearchOn}
        handleAdvancedSearchToggle={handleAdvancedSearchToggle}
      />

      <TableSelectRadios
        tableSelectFields={tableSelectFields}
        selectedTable={formInputs.table}
        handleTableChange={handleTableChange}
      />

      {advancedSearchOn ? (
        <AdvancedSearchTextInputs
          fields={advancedSearchFields.sources}
          handleTextInput={handleAdvancedInput}
        />
      ) : (
        <BasicSearchCheckboxes
          handleFieldChange={handleFieldChange}
          basicSearchFields={basicSearchFields}
          selectedFields={formInputs.basicSearchSelection}
        />
      )}
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

export const AdvancedSearchToggle = ({
  advancedSearchOn,
  handleAdvancedSearchToggle,
}) => {
  const arrowType = advancedSearchOn ? 'up-arrow' : 'down-arrow';
  const prompt = advancedSearchOn
    ? 'Close Advanced Search'
    : 'Open Advanced Search';
  return (
    <span
      id="advancedSearchToggle"
      className="btn-text btn-text__advanced-inputs"
      onClick={handleAdvancedSearchToggle}>
      {prompt}
      <i className={`${arrowType} btn-text__${arrowType}`}></i>
    </span>
  );
};

AdvancedSearchToggle.defaultProps = {
  advancedSearchOn: false,
};

SearchForm.defaultProps = {
  basicSearchFields: [
    {
      value: 'option1',
      label: 'Option11',
    },
    {
      value: 'option2',
      label: 'Option2',
    },
    {
      value: 'option3',
      label: 'Option3',
    },
  ],
  advancedSearchFields: {
    sources: {
      rows: [
        [
          { name: 'name1', label: 'label1', size: 'short' },
          { name: 'name3', label: 'label3', size: 'long' },
        ],
        [{ name: 'name2', label: 'label2', size: 'long' }],
      ],
    },
  },
};

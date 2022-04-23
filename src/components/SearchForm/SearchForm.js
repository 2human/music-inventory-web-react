import React, { useState, useEffect } from 'react';
import { TableSelectRadios } from './TableSelectRadios/TableSelectRadios';
import { BasicSearchCheckboxes } from './BasicSearchCheckboxes/BasicSearchCheckboxes';
import { AdvancedSearchTextInputs } from './AdvancedSearchTextInputs/AdvancedSearchTextInputs';
import { requestURLObject, wasAlreadySelected } from '.';
import { blankAdvancedInputs } from '.';

export const SearchForm = ({
  basicSearchFields,
  tableSelectFields,
  advancedSearchFields,
  initialTable,
}) => {
  const [formInputs, setFormInputs] = useState({
    searchText: '',
    table: initialTable,
    basicSearchSelection: [],
    advancedSearchInputs: {
      ...blankAdvancedInputs(advancedSearchFields['sources'].rows),
    },
  });

  const [advancedSearchOn, setAdvancedSearchOn] = useState(false);

  useEffect(() => {});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await window.fetch(
      requestURLObject(formInputs, advancedSearchOn).href
    );
    if (result.ok) {
      const searchResults = await result.json();
    }
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

  const handleCheckboxChange = ({ target }) => {
    const changedCheckbox = target.value;
    if (wasAlreadySelected(changedCheckbox, formInputs)) {
      deselectCheckbox(changedCheckbox);
    } else {
      selectCheckbox(changedCheckbox);
    }
  };

  const deselectCheckbox = (changedCheckbox) => {
    setFormInputs({
      ...formInputs,
      basicSearchSelection: formInputs.basicSearchSelection.filter(
        (field) => field !== changedCheckbox
      ),
    });
  };

  const selectCheckbox = (changedCheckbox) => {
    setFormInputs({
      ...formInputs,
      basicSearchSelection: [
        ...formInputs.basicSearchSelection,
        changedCheckbox,
      ],
    });
  };

  const handleAdvancedSearchToggle = () => {
    setAdvancedSearchOn(!advancedSearchOn);
  };

  const handleAdvancedSearchInput = ({ target }) => {
    setFormInputs({
      ...formInputs,
      advancedSearchInputs: {
        ...formInputs.advancedSearchInputs,
        [target.name]: target.value,
      },
    });
  };

  return (
    <SearchFormContainer handleSubmit={handleSubmit}>
      <KeywordInputAndSubmitBtn
        handleKeywordInput={handleKeywordInput}
        inputValue={formInputs.searchText}
      />

      <AdvancedSearchToggle
        advancedSearchOn={advancedSearchOn}
        handleAdvancedSearchToggle={handleAdvancedSearchToggle}
      />

      <TableSelectRadios
        fieldData={tableSelectFields}
        selectedTable={formInputs.table}
        handleTableChange={handleTableChange}
      />

      {advancedSearchOn ? (
        <AdvancedSearchTextInputs
          fieldData={advancedSearchFields.sources}
          handleTextInput={handleAdvancedSearchInput}
          inputValues={formInputs.advancedSearchInputs}
        />
      ) : (
        <BasicSearchCheckboxes
          handleFieldChange={handleCheckboxChange}
          fieldData={basicSearchFields}
          selectedFields={formInputs.basicSearchSelection}
        />
      )}
    </SearchFormContainer>
  );
};

const SearchFormContainer = ({ children, handleSubmit }) => (
  <form
    id="searchForm"
    className="search-form"
    onSubmit={handleSubmit}>
    {children}
  </form>
);

const KeywordInputAndSubmitBtn = ({
  handleKeywordInput,
  inputValue,
}) => (
  <KeywordInputAndSubmitContainer>
    <KeywordInput
      handleKeywordInput={handleKeywordInput}
      value={inputValue}
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
  tableSelectFields: [
    { value: 'table1', label: 'label1' },
    { value: 'table2', label: 'label2' },
  ],
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
  initialTable: 'sources',
};

import React from 'react';

export const AdvancedSearchTextInputs = ({ fields }) => {
  return (
    <div id="advancedSearch" className="advanced-search">
      {fields.rows.map((fieldRow) => {})}
      {Object.keys(fields.data).map((fieldName) => (
        <AdvancedSearchInputGroup
          key={fieldName}
          field={fields.data[fieldName]}
        />
      ))}
    </div>
  );
};

export const rowFieldData = (fieldRow, fieldData) => {
  fieldData.filter((field) => fieldRow.some(field.name));
};

const AdvancedSearchInputGroup = ({ field }) => (
  <AdvancedSearchInputGroupContainer>
    <AdvancedSearchInput field={field} />
    <AdvancedSearchInputLabel field={field} />
  </AdvancedSearchInputGroupContainer>
);

const AdvancedSearchInputGroupContainer = ({ children }) => (
  <div className="advanced-search__group">{children}</div>
);

const AdvancedSearchInput = ({ field }) => (
  <input
    id={field.name}
    className={`form__input form__input--${field.size} advanced-search__input`}
    name={field.name}
    placeholder={field.label}
  />
);

const AdvancedSearchInputLabel = ({ field }) => (
  <label className="advanced-search__label" htmlFor={field.name}>
    {field.label}
  </label>
);

AdvancedSearchTextInputs.defaultProps = {
  fields: {
    data: {},
    rows: [],
  },
};

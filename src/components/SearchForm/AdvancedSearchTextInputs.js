import React from 'react';

export const AdvancedSearchTextInputs = ({ fields }) => {
  return (
    <div id="advancedSearch" className="advanced-search">
      {fields.rows.map((row, i) => (
        <AdvancedSearchInputGroupRow key={i}>
          {rowFieldsData(row, fields.data).map((field) => (
            <AdvancedSearchInputGroup
              key={field.name}
              field={field}
            />
          ))}
        </AdvancedSearchInputGroupRow>
      ))}
    </div>
  );
};

/**
 *
 * @param {*} fieldRow Array of field names corresponding to field names.
 * @param {*} fieldData Array of field data objects.
 * @returns Array of field data objects with names contained within fieldRow array.
 */
export const rowFieldsData = (fieldRow, fieldData) => {
  return fieldData.filter((field) =>
    fieldRow.some((row) => row === field.name)
  );
};

const AdvancedSearchInputGroupRow = ({ children }) => (
  <div className="advanced-search__row">{children}</div>
);

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
    data: [],
    rows: [],
  },
};

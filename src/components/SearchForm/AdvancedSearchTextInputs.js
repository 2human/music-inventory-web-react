import React from 'react';

export const AdvancedSearchTextInputs = ({
  fields,
  handleTextInput,
}) => {
  return (
    <div id="advancedSearchTextInputs" className="advanced-inputs">
      {fields.rows.map((row, i) => (
        <AdvancedSearchInputGroupRow key={i}>
          {row.map((field) => (
            <AdvancedSearchInputGroup
              key={field.name}
              field={field}
              handleTextInput={handleTextInput}
            />
          ))}
        </AdvancedSearchInputGroupRow>
      ))}
    </div>
  );
};

const AdvancedSearchInputGroupRow = ({ children }) => (
  <div className="advanced-inputs__row">{children}</div>
);

const AdvancedSearchInputGroup = ({ field, handleTextInput }) => (
  <AdvancedSearchInputGroupContainer>
    <AdvancedSearchInput
      field={field}
      handleTextInput={handleTextInput}
    />
    <AdvancedSearchInputLabel field={field} />
  </AdvancedSearchInputGroupContainer>
);

const AdvancedSearchInputGroupContainer = ({ children }) => (
  <div className="advanced-inputs__group">{children}</div>
);

const AdvancedSearchInput = ({ field, handleTextInput }) => (
  <input
    id={field.name}
    className={`form__input form__input--${field.size} advanced-inputs__input`}
    name={field.name}
    placeholder={field.label}
    onChange={handleTextInput}
  />
);

const AdvancedSearchInputLabel = ({ field }) => (
  <label className="advanced-inputs__label" htmlFor={field.name}>
    {field.label}
  </label>
);

AdvancedSearchTextInputs.defaultProps = {
  handleTextInput: () => {},
  fields: {
    rows: [],
  },
};

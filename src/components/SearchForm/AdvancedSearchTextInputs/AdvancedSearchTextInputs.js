import React from 'react';

export const AdvancedSearchTextInputs = ({
  fieldData,
  inputValues,
  handleTextInput,
}) => {
  return (
    <AdvancedSearchTextInputsContainer>
      {fieldData.rows.map((row, i) => (
        <AdvancedSearchInputGroupRow key={i}>
          {row.map((fieldData) => (
            <AdvancedSearchInputGroup key={fieldData.name}>
              <AdvancedSearchInput
                fieldData={fieldData}
                handleTextInput={handleTextInput}
                value={inputValues[fieldData.name]}
              />
              <AdvancedSearchInputLabel fieldData={fieldData} />
            </AdvancedSearchInputGroup>
          ))}
        </AdvancedSearchInputGroupRow>
      ))}
    </AdvancedSearchTextInputsContainer>
  );
};

const AdvancedSearchTextInputsContainer = ({ children }) => (
  <div id="advancedSearchTextInputs" className="advanced-inputs">
    {children}
  </div>
);
const AdvancedSearchInputGroupRow = ({ children }) => (
  <div className="advanced-inputs__row">{children}</div>
);

const AdvancedSearchInputGroup = ({ children }) => (
  <div className="advanced-inputs__group">{children}</div>
);

const AdvancedSearchInput = ({
  fieldData,
  handleTextInput,
  value,
}) => (
  <input
    id={fieldData.name}
    className={`form__input form__input--${fieldData.size} advanced-inputs__input`}
    name={fieldData.name}
    placeholder={fieldData.label}
    onChange={handleTextInput}
    value={value}
  />
);

const AdvancedSearchInputLabel = ({ fieldData }) => (
  <label className="advanced-inputs__label" htmlFor={fieldData.name}>
    {fieldData.label}
  </label>
);

AdvancedSearchTextInputs.defaultProps = {
  handleTextInput: () => {},
  fieldData: {
    rows: [],
  },
  inputValues: [],
};

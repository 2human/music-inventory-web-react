import React from 'react';

export const AdvancedSearchInputs = ({
  fieldData,
  inputValues,
  handleInput,
}) => {
  return (
    <AdvancedSearchTextInputsContainer>
      {fieldData.rows.map((row, i) => (
        <AdvancedSearchInputGroupRow key={i}>
          {row.map((field) => (
            <AdvancedSearchInputGroup
              key={field.name}
              fieldData={fieldData}
              inputValues={inputValues}
              handleInput={handleInput}
              field={field}
            />
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

const AdvancedSearchInputGroup = ({
  field,
  inputValues,
  handleInput,
}) => {
  const renderInputGroup = (field) => {
    switch (field.name) {
      case 'melodicIncipit':
        return (
          <React.Fragment>
            <AdvancedSearchInput
              field={field}
              handleInput={handleInput}
              value={inputValues[field.name]}
            />
            <AdvancedSearchInputLabel field={field} />
            <MelodicIncipitCheckboxGroup
              handleInput={handleInput}
              checked={inputValues.pitchesOnly}
            />
          </React.Fragment>
        );
      case 'isSecular':
        return (
          <React.Fragment>
            <IsSecularSelectGroup
              value={inputValues.isSecular}
              handleInput={handleInput}
            />
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <AdvancedSearchInput
              field={field}
              handleInput={handleInput}
              value={inputValues[field.name]}
            />
            <AdvancedSearchInputLabel field={field} />
          </React.Fragment>
        );
    }
  };
  return (
    <div className="advanced-inputs__group">
      {renderInputGroup(field)}
    </div>
  );
};

const AdvancedSearchInput = ({ field, handleInput, value }) => (
  <input
    id={field.name}
    className={`form__input form__input--${field.size} advanced-inputs__input`}
    name={field.name}
    placeholder={field.label}
    onChange={handleInput}
    value={value}
  />
);

const AdvancedSearchInputLabel = ({ field }) => (
  <label
    className="advanced-inputs__label u-inline-block"
    htmlFor={field.name}>
    {field.label}
  </label>
);

const MelodicIncipitCheckboxGroup = ({ handleInput, checked }) => (
  <span className="advanced-inputs__pitches-only">
    <label htmlFor={'pitchesOnly'}>
      Pitches Only<a>(?)</a>&nbsp;
    </label>
    <input type="hidden" name="pitchesOnly" value="" />
    <input
      type="checkbox"
      id="pitchesOnly"
      name="pitchesOnly"
      checked={checked}
      onChange={handleInput}
    />
  </span>
);

const IsSecularSelectGroup = ({ handleInput }) => (
  <React.Fragment>
    <select
      id="isSecular"
      name="isSecular"
      className="form__select form__input--short advanced-inputs__select"
      placeholder=""
      onChange={handleInput}>
      <option value=""></option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
    <label className="advanced-inputs__label " htmlFor="isSecular">
      Secular?
    </label>
  </React.Fragment>
);

AdvancedSearchInputs.defaultProps = {
  handleInput: () => {},
  fieldData: {
    rows: [],
  },
  inputValues: [],
};

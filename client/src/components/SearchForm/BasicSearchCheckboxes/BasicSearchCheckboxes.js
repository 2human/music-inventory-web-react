import React from 'react';

export const BasicSearchCheckboxes = ({
  fieldData,
  handleFieldChange,
  selectedFields,
}) => {
  return (
    <BasicSearchCheckboxesContainer>
      {fieldData.map(({ value, label }) => (
        <BasicSearchCheckboxGroup key={value}>
          <BasicSearchCheckbox
            value={value}
            name={'field'}
            handleFieldChange={handleFieldChange}
            isSelected={selectedFields.includes(value)}
          />
          <BasicSearchCheckboxLabel value={value} label={label} />
        </BasicSearchCheckboxGroup>
      ))}
    </BasicSearchCheckboxesContainer>
  );
};

const BasicSearchCheckboxesContainer = ({ children }) => (
  <React.Fragment>
    <div id="basicSearchCheckboxes" className="basic-inputs">
      <span className="basic-inputs__checkboxes-label u-text-top">
        Field(s):&nbsp;
      </span>
      <div className="basic-inputs_checkboxes">{children}</div>
    </div>
  </React.Fragment>
);

const BasicSearchCheckboxGroup = ({ children }) => {
  return (
    <div className="basic-inputs__checkbox-group">{children}</div>
  );
};

export const BasicSearchCheckbox = ({
  value,
  isSelected,
  handleFieldChange,
}) => (
  <input
    type="checkbox"
    className="basic-inputs__checkbox"
    value={value}
    name={'field'}
    id={value}
    checked={isSelected}
    onChange={handleFieldChange}
  />
);

const BasicSearchCheckboxLabel = ({ value, label }) => (
  <label htmlFor={value} className="basic-inputs__label">
    {label}
  </label>
);

BasicSearchCheckboxes.defaultProps = {
  fieldData: [],
  selectedFields: [],
};

BasicSearchCheckbox.defaultProps = {
  value: 'option1',
  label: 'Option11',
  isSelected: false,
  handleFieldChange: () => {},
};

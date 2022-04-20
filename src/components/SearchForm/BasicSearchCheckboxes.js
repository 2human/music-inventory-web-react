import React from 'react';

export const BasicSearchCheckboxes = ({
  fieldOptions,
  handleFieldChange,
  selectedFields,
}) => {
  return (
    <BasicSearchCheckboxesContainer>
      {fieldOptions.map((option) => (
        <BasicSearchCheckboxOption
          key={option.value}
          value={option.value}
          label={option.label}
          handleFieldChange={handleFieldChange}
          isSelected={selectedFields.includes(option.value)}
        />
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

export const BasicSearchCheckboxOption = ({
  value,
  label,
  handleFieldChange,
  isSelected,
}) => {
  return (
    <div className="basic-inputs__checkbox-group">
      <input
        type="checkbox"
        className="basic-inputs__checkbox"
        value={value}
        name={'field'}
        id={value}
        checked={isSelected}
        onChange={handleFieldChange}
      />
      <label htmlFor={value} className="basic-inputs__label">
        {label}
      </label>
    </div>
  );
};

BasicSearchCheckboxes.defaultProps = {
  fieldOptions: [],
  selectedFields: [],
};

BasicSearchCheckboxOption.defaultProps = {
  value: 'option1',
  label: 'Option11',
  isSelected: false,
  handleFieldChange: () => {},
};

import React from 'react';

export const FieldSelect = ({
  fieldOptions,
  handleFieldChange,
  selectedFields,
}) => {
  return (
    <FieldSelectContainer>
      {fieldOptions.map((option) => (
        <FieldSelectOption
          key={option.value}
          value={option.value}
          label={option.label}
          handleFieldChange={handleFieldChange}
          isSelected={selectedFields.some(
            (selectedField) => selectedField === option.value
          )}
        />
      ))}
    </FieldSelectContainer>
  );
};

const FieldSelectContainer = ({ children }) => (
  <React.Fragment>
    <div id="fieldSelect" className="field-select">
      <span className="field-select__checkboxes-label u-text-top">
        Field(s):&nbsp;
      </span>
      <div className="field-select_checkboxes">{children}</div>
    </div>
  </React.Fragment>
);

export const FieldSelectOption = ({
  value,
  label,
  handleFieldChange,
  isSelected,
}) => {
  return (
    <div className="field-select__checkbox-group">
      <input
        type="checkbox"
        className="field-select__checkbox"
        value={value}
        name={'field'}
        id={value}
        checked={isSelected}
        onChange={handleFieldChange}
      />
      <label htmlFor={value} className="field-select__label">
        {label}
      </label>
    </div>
  );
};

FieldSelect.defaultProps = {
  fieldOptions: [
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
  selectedFields: [],
};

FieldSelectOption.defaultProps = {
  value: 'option1',
  label: 'Option11',
  isSelected: false,
  handleFieldChange: () => {},
};

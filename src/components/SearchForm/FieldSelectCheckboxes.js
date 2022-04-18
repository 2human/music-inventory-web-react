import React from 'react';

export const FieldSelectCheckboxes = ({
  fieldOptions,
  handleFieldChange,
  selectedFields,
}) => {
  return (
    <FieldSelectCheckboxesContainer>
      {fieldOptions.map((option) => (
        <FieldSelectCheckboxesOption
          key={option.value}
          value={option.value}
          label={option.label}
          handleFieldChange={handleFieldChange}
          isSelected={selectedFields.some(
            (selectedField) => selectedField === option.value
          )}
        />
      ))}
    </FieldSelectCheckboxesContainer>
  );
};

const FieldSelectCheckboxesContainer = ({ children }) => (
  <React.Fragment>
    <div id="FieldSelectCheckboxes" className="field-select">
      <span className="field-select__checkboxes-label u-text-top">
        Field(s):&nbsp;
      </span>
      <div className="field-select_checkboxes">{children}</div>
    </div>
  </React.Fragment>
);

export const FieldSelectCheckboxesOption = ({
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

FieldSelectCheckboxes.defaultProps = {
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

FieldSelectCheckboxesOption.defaultProps = {
  value: 'option1',
  label: 'Option11',
  isSelected: false,
  handleFieldChange: () => {},
};

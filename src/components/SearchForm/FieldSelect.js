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
          key={option.name}
          name={option.name}
          label={option.label}
          handleFieldChange={handleFieldChange}
          isSelected={selectedFields.some(
            (selectedField) => selectedField === option.name
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
  name,
  label,
  handleFieldChange,
  isSelected,
}) => {
  return (
    <div className="field-select__checkbox-group">
      <input
        type="checkbox"
        className="field-select__checkbox"
        value={name}
        name={name}
        id={name}
        checked={isSelected}
        onChange={handleFieldChange}
      />
      <label htmlFor={name} className="field-select__label">
        {label}
      </label>
    </div>
  );
};

FieldSelect.defaultProps = {
  fieldOptions: [
    {
      name: 'option1',
      label: 'Option11',
    },
    {
      name: 'option2',
      label: 'Option2',
    },
    {
      name: 'option3',
      label: 'Option3',
    },
  ],
  selectedFields: [],
};

FieldSelectOption.defaultProps = {
  name: 'option1',
  label: 'Option11',
  isSelected: false,
  handleFieldChange: () => {},
};

import React from 'react';

export const FieldSelect = ({ fieldOptions }) => {
  return (
    <div id="fieldSelect" className="field-select">
      {fieldOptions.map( option => (
        <div key={option.name}> 
          <input 
            type="checkbox"
            value={option.name}
            name={option.name}
            id={option.name}
          />
          <label htmlFor={option.name}>{option.label}</label>
        </div>
      ))}
    </div>
  )
};

FieldSelect.defaultProps = {
  fieldOptions: [
    {
      name: 'option1',
      label: 'Option11'
    },
    {
      name: 'option2',
      label: 'Option2'
    },
    {
      name: 'option2',
      label: 'Option2'
    }
  ]
};


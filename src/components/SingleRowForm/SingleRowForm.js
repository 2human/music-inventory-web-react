import React, { useState } from 'react';

export const SingleRowForm = ({ fields, data }) => {
  const [formInputs, setFormInputs] = useState({ ...data });

  return (
    <form id="editCreateRow">
      {fields.map((field) => (
        <React.Fragment>
          <SingleRowFormLabel field={field} />
          <input
            type="text"
            id={field.name}
            name={field.name}
            value={data[field.name] || ''}
            readOnly
          />
        </React.Fragment>
      ))}
    </form>
  );
};

const SingleRowFormLabel = ({ field }) => (
  <label
    htmlFor={field.name}
    className="form__label form__label--modal">
    {field.label}
  </label>
);

SingleRowForm.defaultProps = {
  fields: [],
  data: {},
};

import React, { useState } from 'react';
import { formMode, initialFormInputs } from './singleRowFormHelpers';

export const SingleRowForm = ({
  fields,
  data,
  updateRow,
  deleteRow,
  createRow,
}) => {
  const [formInputs, setFormInputs] = useState({
    ...initialFormInputs(data, fields),
  });

  const [deleting, setDeleting] = useState(false);

  const handleInput = ({ target }) => {
    if (target.name === 'isSecular') {
      setFormInputs({
        ...formInputs,
        isSecular: formInputs.isSecular === 'true' ? 'false' : 'true',
      });
    } else {
      setFormInputs({
        ...formInputs,
        [target.name]: target.value,
      });
    }
  };

  const handleUpdateBtnClick = () => updateRow(formInputs);

  const handleDeleteBtnClick = () => setDeleting(true);

  const handleConfirmDeleteBtnClick = () => deleteRow(formInputs.id);

  const handleCancelDeleteBtnClick = () => setDeleting(false);

  const handleCreateBtnClick = () => createRow(formInputs);

  const clearInputs = () =>
    setFormInputs({ ...initialFormInputs({}, fields) });

  const handleClearBtnClick = () => clearInputs();

  const renderButtons = (data) => {
    if (formMode(data) === 'edit') {
      console.log('rendering');
      if (deleting) {
        return (
          <SingleRowFormConfirmDeletePrompt
            handleConfirmDeleteBtnClick={handleConfirmDeleteBtnClick}
            handleCancelDeleteBtnClick={handleCancelDeleteBtnClick}
          />
        );
      } else {
        return (
          <React.Fragment>
            <SingleRowFormUpdateBtn
              handleUpdateBtnClick={handleUpdateBtnClick}
            />
            <SingleRowFormDeleteBtn
              handleDeleteBtnClick={handleDeleteBtnClick}
            />
          </React.Fragment>
        );
      }
    } else {
      return (
        <React.Fragment>
          <SingleRowFormCreateBtn
            handleCreateBtnClick={handleCreateBtnClick}
          />
          <SingleRowFormClearBtn
            handleClearBtnClick={handleClearBtnClick}
          />
        </React.Fragment>
      );
    }
  };

  return (
    <form id="editCreateRow" className="single-row-form">
      {fields.map((field) => (
        <SingleRowFormInputGroup key={field.name}>
          <SingleRowFormLabel field={field} />
          <SingleRowFormInput
            field={field}
            value={formInputs[field.name]}
            handleInput={handleInput}
          />
        </SingleRowFormInputGroup>
      ))}
      <SingleRowFormBtnContainer>
        {renderButtons(data)}
      </SingleRowFormBtnContainer>
    </form>
  );
};

const SingleRowFormConfirmDeletePrompt = ({
  handleConfirmDeleteBtnClick,
  handleCancelDeleteBtnClick,
}) => (
  <React.Fragment>
    <SingleRowFormDeleteConfirmMessage />
    <SingleRowFormConfirmDeleteBtn
      handleConfirmDeleteBtnClick={handleConfirmDeleteBtnClick}
    />
    <SingleRowFormCancelDeleteBtn
      handleCancelDeleteBtnClick={handleCancelDeleteBtnClick}
    />
  </React.Fragment>
);

const SingleRowFormDeleteConfirmMessage = () => (
  <span
    className="u-text-medium u-margin-right-small"
    id="deleteConfirmPrompt">
    Are you sure you would like to delete this row?
  </span>
);

const SingleRowFormConfirmDeleteBtn = ({
  handleConfirmDeleteBtnClick,
}) => (
  <button
    type="button"
    id="confirmDelete"
    className="btn btn--blue u-margin-right-small"
    onClick={handleConfirmDeleteBtnClick}>
    Confirm
  </button>
);

const SingleRowFormCancelDeleteBtn = ({
  handleCancelDeleteBtnClick,
}) => (
  <button
    type="button"
    id="cancelDelete"
    className="btn btn--blue"
    onClick={handleCancelDeleteBtnClick}>
    Cancel
  </button>
);

const SingleRowFormUpdateBtn = ({ handleUpdateBtnClick }) => (
  <button
    type="button"
    id="updateRow"
    className="btn btn--blue u-margin-right-small"
    onClick={handleUpdateBtnClick}>
    Update
  </button>
);

const SingleRowFormDeleteBtn = ({ handleDeleteBtnClick }) => (
  <button
    type="button"
    id="deleteRow"
    className="btn btn--blue"
    onClick={handleDeleteBtnClick}>
    Delete
  </button>
);

const SingleRowFormCreateBtn = ({ handleCreateBtnClick }) => (
  <button
    type="button"
    id="createRow"
    className="btn btn--blue u-margin-right-small"
    onClick={handleCreateBtnClick}>
    Create
  </button>
);

const SingleRowFormClearBtn = ({ handleClearBtnClick }) => (
  <button
    type="button"
    id="clearInputs"
    className="btn btn--blue u-margin-right-small"
    onClick={handleClearBtnClick}>
    Clear
  </button>
);

const SingleRowFormInputGroup = ({ children }) => (
  <div className="modal__input-group">{children}</div>
);

const SingleRowFormLabel = ({ field }) => (
  <label
    htmlFor={field.name}
    className="form__label form__label--modal">
    {field.label}
  </label>
);

const SingleRowFormInput = ({ field, value, handleInput }) => {
  switch (field.name) {
    case 'inscription':
    case 'description':
      return (
        <textarea
          className="form__textarea"
          id={field.name}
          name={field.name}
          value={value}
          onChange={handleInput}
        />
      );
    case 'isSecular':
      return (
        <input
          type="checkbox"
          className="form__input u-margin-left-tiny"
          id={field.name}
          name={field.name}
          value={field.name}
          checked={value === 'true'}
          onChange={handleInput}
        />
      );
    default:
      return (
        <input
          className="form__input form__input--extra-long"
          type="text"
          id={field.name}
          name={field.name}
          value={value}
          onChange={handleInput}
        />
      );
  }
};

const SingleRowFormBtnContainer = ({ children }) => (
  <div className="single-row-form__btn-group">{children}</div>
);

SingleRowForm.defaultProps = {
  fields: [],
  data: {},
  updateRow: () => {},
  deleteRow: () => {},
  createRow: () => {},
};

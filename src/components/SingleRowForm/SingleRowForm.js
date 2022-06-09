import React, { useState } from 'react';
import { formMode, initialFormInputs } from './singleRowFormHelpers';

export const SingleRowForm = ({
  fields,
  data,
  updateRow,
  deleteRow,
  createRow,
  status,
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

  const handleConfirmDeleteBtnClick = () => deleteRow(formInputs);

  const handleCancelDeleteBtnClick = () => setDeleting(false);

  const handleCreateBtnClick = () => createRow(formInputs);

  const clearInputs = () =>
    setFormInputs({ ...initialFormInputs({}, fields) });

  const handleClearBtnClick = () => clearInputs();

  const renderButtons = (data) => {
    if (formMode(data) === 'edit') {
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
        <React.Fragment>
          <SingleRowFormLabel field={field} />
          <SingleRowFormInput
            field={field}
            value={formInputs[field.name]}
            handleInput={handleInput}
          />
        </React.Fragment>
      ))}

      <SingleRowFormStatusMessage status={status} />

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
  <div className="">{children}</div>
);

const SingleRowFormLabel = ({ field }) => {
  const className = () => {
    if (
      field.name === 'inscription' ||
      field.name === 'description'
    ) {
      return 'form__label form__label--modal form__label--textarea';
    } else {
      return 'form__label form__label--modal';
    }
  };

  return (
    <label htmlFor={field.name} className={className()}>
      {field.label}
    </label>
  );
};

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
          className="form__input form__input--extra-long modal__input"
          type="text"
          id={field.name}
          name={field.name}
          value={value}
          onChange={handleInput}
        />
      );
  }
};

const SingleRowFormStatusMessage = ({ status }) => {
  const renderStatusMessage = () => {
    if (status === undefined) {
      return <div />;
    } else if (status === 'SUBMITTING') {
      return <MiniLoadingSpinner />;
    } else if (status === 'FAILED') {
      return <SingleRowFormErrorMessage />;
    } else if (status === 'SUCCESSFUL') {
      return <SingleRowFormSuccessMessage />;
    }
  };

  return (
    <div className="u-center-text u-text-bold" id="statusMessage">
      {renderStatusMessage()}
    </div>
  );
};

const MiniLoadingSpinner = () => (
  <div
    id="loadingSpinner"
    className="spinner__container--mini u-margin-top-tiny">
    <div className="spinner__animation spinner__animation--mini" />
  </div>
);

const SingleRowFormErrorMessage = () => (
  <div id="errorMessage" className="u-margin-top-small">
    There was an error creating a new row. Please check your
    connection and try again.
  </div>
);

const SingleRowFormSuccessMessage = () => (
  <div id="successMessage" className="u-margin-top-small">
    Row create successfully.
  </div>
);

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

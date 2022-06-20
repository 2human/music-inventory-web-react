import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  formMode,
  initialFormInputs,
  isValidInput,
  renderSuccessMessage,
} from './singleRowFormHelpers';

export const SingleRowForm = ({
  fields,
  selectedField,
  data,
  updateRow,
  deleteRow,
  createRow,
  status,
}) => {
  const [formInputs, setFormInputs] = useState({
    ...initialFormInputs(data, fields),
  });

  useEffect(() => {
    const selected = document.querySelector(
      `#editCreateRow [name="${selectedField}"]`
    );
    if (selected) {
      selected.select();
    }
  }, []);

  const [deleting, setDeleting] = useState(false);

  const mode = formMode(data);

  const handleInput = ({ target }) => {
    if (!isValidInput(target.name, target.value)) return;
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mode === 'edit') {
      updateRow(formInputs);
    } else {
      createRow(formInputs);
    }
  };

  const handleConfirmDeleteBtnClick = () => deleteRow(formInputs);

  const handleDeleteBtnClick = () => setDeleting(true);

  const handleCancelDeleteBtnClick = () => setDeleting(false);

  const clearInputs = () =>
    setFormInputs({ ...initialFormInputs({}, fields) });

  const handleClearBtnClick = () => clearInputs();

  const renderButtons = () => {
    if (mode === 'edit') {
      if (deleting) {
        //deletion in progress
        return (
          <SingleRowFormConfirmDeletePrompt
            handleConfirmDeleteBtnClick={handleConfirmDeleteBtnClick}
            handleCancelDeleteBtnClick={handleCancelDeleteBtnClick}
          />
        );
      } else {
        return (
          <React.Fragment>
            <SingleRowFormUpdateBtn />
            <SingleRowFormDeleteBtn
              handleDeleteBtnClick={handleDeleteBtnClick}
            />
          </React.Fragment>
        );
      }
    } else {
      //create mode buttons
      return (
        <React.Fragment>
          <SingleRowFormCreateBtn />
          <SingleRowFormClearBtn
            handleClearBtnClick={handleClearBtnClick}
          />
        </React.Fragment>
      );
    }
  };

  return (
    <form
      id="editCreateRow"
      className="single-row-form"
      onSubmit={handleSubmit}>
      {fields.map((field) => (
        <React.Fragment key={field.name}>
          <SingleRowFormLabel field={field} />
          <SingleRowFormInput
            field={field}
            value={formInputs[field.name]}
            handleInput={handleInput}
          />
        </React.Fragment>
      ))}

      <SingleRowFormStatusMessage status={status} mode={mode} />

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
    <SingleRowFormCancelDeleteBtn
      handleCancelDeleteBtnClick={handleCancelDeleteBtnClick}
    />
    <SingleRowFormConfirmDeleteBtn
      handleConfirmDeleteBtnClick={handleConfirmDeleteBtnClick}
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
    className="btn btn--blue"
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
    className="btn btn--blue u-margin-right-small"
    onClick={handleCancelDeleteBtnClick}>
    Cancel
  </button>
);

const SingleRowFormUpdateBtn = ({}) => (
  <button
    type="submit"
    id="updateRow"
    className="btn btn--blue u-margin-right-small">
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

const SingleRowFormCreateBtn = () => (
  <button
    type="submit"
    id="createRow"
    className="btn btn--blue u-margin-right-small">
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
      {field.label}:
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
        <React.Fragment>
          <input
            type="checkbox"
            className="form__input u-margin-left-tiny modal__input"
            id={field.name}
            name={field.name}
            value={field.name}
            checked={value === 'true'}
            onChange={handleInput}
          />
          <br />
        </React.Fragment>
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

const SingleRowFormStatusMessage = ({ status, mode }) => {
  const renderStatusMessage = () => {
    if (status === undefined) {
      return <div />;
    } else if (status === 'SUBMITTING') {
      return <MiniLoadingSpinner />;
    } else if (status === 'FAILED') {
      return <SingleRowFormErrorMessage />;
    } else if (status === 'SUCCESSFUL') {
      return <SingleRowFormSuccessMessage mode={mode} />;
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

const SingleRowFormSuccessMessage = ({ mode }) => (
  <div id="successMessage" className="u-margin-top-small">
    {renderSuccessMessage(mode)}
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

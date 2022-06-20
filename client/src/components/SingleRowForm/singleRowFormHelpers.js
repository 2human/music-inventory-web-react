const isEmptyObject = (data) => Object.keys(data).length === 0;

export const formMode = (data) => {
  if (isEmptyObject(data)) {
    //create mode when empty object
    return 'create';
  } else {
    return 'edit';
  }
};

export const initialFormInputs = (data, fields) => {
  if (formMode(data) === 'create') {
    const formInputs = {};
    fields.forEach((field) => (formInputs[field.name] = ''));
    return formInputs;
  } else {
    //when there is data
    return { ...data };
  }
};

export const rowData = (data, rowId) =>
  rowId === undefined
    ? undefined
    : data.find((row) => row.id === rowId);

export const renderSuccessMessage = (mode) => {
  if (mode === 'edit') {
    return 'Row updated successfully.';
  } else {
    //create mode
    return 'Row created successfully.';
  }
};

const isDecimal = (value) => {
  var pattern = /\d/;
  return pattern.test(value) || value === '' || value === '.';
};

export const isValidInput = (fieldName, value) => {
  if (fieldName === 'sourceNumber') {
    return isDecimal(value);
  }
  return true;
};

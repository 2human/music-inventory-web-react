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

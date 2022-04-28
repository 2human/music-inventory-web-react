export const requestURLObject = (formInputs) => {
  const requestURL = new URL(
    `http://localhost:8080/${formInputs.table}`
  );
  requestURL.searchParams.set('searchText', formInputs.searchText);
  requestURL.searchParams.set('table', formInputs.table);
  if (formInputs.advancedSearchOn) {
    //append advanced search input params
    const advancedInputs = formInputs.advancedSearchInputs;
    Object.keys(advancedInputs).forEach((field) =>
      requestURL.searchParams.append(field, advancedInputs[field])
    );
  } else {
    //append basic search input params
    formInputs.basicSearchSelection.forEach((field) =>
      requestURL.searchParams.append('field', field)
    );
  }
  return requestURL;
};

export const wasAlreadySelected = (field, formInputs) => {
  return formInputs.basicSearchSelection.includes(field);
};

export const blankAdvancedInputs = (fieldRows) => {
  const blankInputs = {};
  fieldsArrayFromRows(fieldRows).forEach((field) => {
    blankInputs[field.name] = '';
    //add pitches only after melodicIncipit
    if (field.name === 'melodicIncipit') {
      blankInputs['pitchesOnly'] = false;
    }
  });
  return blankInputs;
};

//iterates over field rows to accumulate array of field objects
export const advancedFieldNameArray = (fieldRows) => {
  let fieldObjects = [];
  fieldRows.forEach(
    (row) => (fieldObjects = [...fieldObjects, ...row])
  );
  return fieldObjects.map((field) => field.name);
};

export const fieldsArrayFromRows = (fieldRows) => {
  return fieldRows.reduce((acc, row) => [...acc, ...row], []);
};

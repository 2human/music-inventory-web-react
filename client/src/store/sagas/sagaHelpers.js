export const requestURLObjectFrom = (formInputs) => {
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

export const dataType = (data) => {
  if (data.callNumber !== undefined) {
    return 'sources';
  } else if (data.melodicIncipit !== undefined) {
    return 'entries';
  } else if (data.description !== undefined) {
    return 'collections';
  } else return '';
};

export const updateRequestURLObjectFrom = (data) => {
  const requestURL = new URL(
    `http://localhost:8080/${dataType(data)}`
  );
};

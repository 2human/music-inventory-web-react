export const advancedSearchFields = {
  sources: {
    rows: [
      [
        {
          name: 'sourceNumber',
          label: 'Source Number',
          size: 'short',
        },
      ],
      [
        { name: 'collection', label: 'Collection', size: 'long' },
        { name: 'callNumber', label: 'Call Number', size: 'long' },
      ],
      [
        { name: 'author', label: 'Author', size: 'long' },
        { name: 'title', label: 'Title', size: 'long' },
      ],
      [
        { name: 'inscription', label: 'Inscription', size: 'long' },
        { name: 'description', label: 'Description', size: 'long' },
      ],
    ],
  },
};

export const blankAdvancedInputs = (fieldRows) => {
  const obj = {};
  fieldsArrayFromRows(fieldRows).forEach(
    (field) => (obj[field.name] = '')
  );
  return obj;
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

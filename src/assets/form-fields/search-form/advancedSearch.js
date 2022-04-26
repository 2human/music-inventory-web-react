const sources = {
  data: [
    {
      name: 'sourceNumber',
      label: 'Source Number',
      size: 'short',
    },
    { name: 'collection', label: 'Collection', size: 'long' },
    { name: 'callNumber', label: 'Call Number', size: 'long' },
    { name: 'author', label: 'Author', size: 'long' },
    { name: 'title', label: 'Title', size: 'long' },
    { name: 'inscription', label: 'Inscription', size: 'long' },
    { name: 'description', label: 'Description', size: 'long' },
  ],
  rows: [
    ['sourceNumber'],
    ['collection', 'callNumber'],
    ['author', 'title'],
    ['inscription', 'description'],
  ],
};

const entries = {
  data: [
    {
      name: 'collection',
      label: 'Collection',
      size: 'long',
    },
    {
      name: 'sourceNumber',
      label: 'Source Number',
      size: 'short',
    },
    {
      name: 'location',
      label: 'Location',
      size: 'short',
    },
    {
      name: 'title',
      label: 'Title',
      size: 'long',
    },
    {
      name: 'composer',
      label: 'Composer',
      size: 'long',
    },
    {
      name: 'vocalPart',
      label: 'Vocal Part',
      size: 'long',
    },
    {
      name: 'key',
      label: 'Key',
      size: 'long',
    },
    {
      name: 'melodicIncipit',
      label: 'Melodic Incipit',
      size: 'long',
    },
    {
      name: 'textIncipit',
      label: 'Text Incipit',
      size: 'long',
    },
    {
      name: 'isSecular',
      label: 'Secular',
      size: 'short',
    },
    {
      name: 'notes',
      label: 'Notes',
      size: 'long',
    },
  ],
  rows: [
    ['sourceNumber', 'location', 'isSecular'],
    ['collection', 'title'],
    ['composer', 'vocalPart'],
    ['key', 'melodicIncipit'],
    ['textIncipit', 'notes'],
  ],
};

const rowFields = [
  ['sourceNumber', 'location', 'secular'],
  ['collection', 'title'],
  ['composer', 'vocalPart'],
  ['key', 'melodicIncipit'],
  ['textIncipit', 'notes'],
];

const dataToRows = (fieldData, rowFields) =>
  rowFields.map((row) => [
    ...row.map((fieldName) =>
      fieldData.find((field) => field.name === fieldName)
    ),
  ]);

export const advancedSearchFields = {
  sources: {
    data: [...sources.data],
    rows: dataToRows(sources.data, sources.rows),
  },
  entries: {
    data: [...entries.data],
    rows: dataToRows(entries.data, entries.rows),
  },
};

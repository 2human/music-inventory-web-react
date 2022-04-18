export const fieldOptions = [
  {
    value: 'collection',
    label: 'Collection',
  },
  {
    value: 'sourceNumber',
    label: 'Source Number',
  },
  {
    value: 'callNumber',
    label: 'Call Number',
  },
  {
    value: 'author',
    label: 'Author',
  },
  {
    value: 'title',
    label: 'Title',
  },
  {
    value: 'inscription',
    label: 'Inscriptions',
  },
  {
    value: 'description',
    label: 'Description',
  },
];

export const tableOptions = [
  {
    value: 'collections',
    label: 'Collections',
  },
  {
    value: 'sources',
    label: 'Sources',
  },
  {
    value: 'entries',
    label: 'Entries',
  },
];

export const advancedSearchFields = {
  sources: {
    data: [
      { name: 'sourceNumber', label: 'Source Number', size: 'short' },
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
  },
};

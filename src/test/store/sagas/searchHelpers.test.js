import { requestURLObjectFrom } from '../../../store/sagas/searchHelpers';

describe('requestURLObjectFrom', () => {
  const formInputs = {
    searchText: '',
    table: 'table1',
    basicSearchSelection: ['f1', 'f2'],
    advancedSearchInputs: {
      field1: 'f1text',
      field2: 'f2text',
    },
    advancedSearchOn: false,
  };

  it('sets the URL pathname according to table value', () => {
    expect(requestURLObjectFrom(formInputs).pathname).toEqual(
      `/${formInputs.table}`
    );
  });

  it('sets the right search params when performing basic search', () => {
    expect(requestURLObjectFrom(formInputs).search).toEqual(
      '?searchText=&table=table1&field=f1&field=f2'
    );
  });

  it('sets the right search params when performing advanced search', () => {
    expect(
      requestURLObjectFrom({ ...formInputs, advancedSearchOn: true })
        .search
    ).toEqual(
      '?searchText=&table=table1&field1=f1text&field2=f2text'
    );
  });
});

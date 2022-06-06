import {
  dataType,
  requestURLObjectFrom,
} from '../../../store/sagas/sagaHelpers';

describe('sagaHelpers', () => {
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
        requestURLObjectFrom({
          ...formInputs,
          advancedSearchOn: true,
        }).search
      ).toEqual(
        '?searchText=&table=table1&field1=f1text&field2=f2text'
      );
    });
  });

  describe('dataType', () => {
    it('returns "sources" when the data contains a callNumber property', () => {
      expect(dataType({ callNumber: '' })).toEqual('sources');
    });

    it('returns "sources" when the data contains a callNumber property', () => {
      expect(dataType({ callNumber: '' })).toEqual('sources');
    });

    it('returns "entries" when the data contains a melodicIncipit property', () => {
      expect(dataType({ melodicIncipit: '' })).toEqual('entries');
    });

    it('returns "collections" when the data contains a description property but no melodicIncipit or callNumber', () => {
      expect(dataType({ description: '' })).toEqual('collections');
    });

    it('returns an empty string when none of the other condtions are met', () => {
      expect(dataType({ someProp: '' })).toEqual('');
    });
  });
});

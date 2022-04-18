import React from 'react';
import {
  AdvancedSearchTextInputs,
  rowFieldsData,
} from '../components/SearchForm/AdvancedSearchTextInputs';
import { createContainer } from './domManipulators';

describe('AdvancedSearchTextInputs', () => {
  let render, element, elements;

  beforeEach(() => {
    ({ render, element, elements } = createContainer());
  });

  it('renders the advancedSearch div', () => {
    render(<AdvancedSearchTextInputs />);
    expect(element('#advancedSearch')).not.toBeNull();
  });

  const fields = {
    data: [
      { name: 'field1name', label: 'Field1label', size: 'short' },
      { name: 'field2name', label: 'Field2label', size: 'long' },
      { name: 'field3name', label: 'Field3label', size: 'long' },
    ],
    rows: [['field1name', 'field2name'], ['field3name']],
  };

  it('renders a field row div element for each row', () => {
    render(<AdvancedSearchTextInputs fields={fields} />);
    const fieldRows = elements('.advanced-search__row');
    expect(fieldRows).toHaveLength(fields.rows.length);
  });

  it('renders the right fields within each row', () => {
    render(<AdvancedSearchTextInputs fields={fields} />);
    const firstRowFields = elements(
      '.advanced-search__row:nth-of-type(1) input'
    );
    expect(firstRowFields).not.toBeNull();
    expect(firstRowFields).toHaveLength(fields.rows[0].length);
    expect(firstRowFields[0].name).toEqual(fields.rows[0][0]);
    expect(firstRowFields[1].name).toEqual(fields.rows[0][1]);
    const secondRowFields = elements(
      '.advanced-search__row:nth-of-type(2) input'
    );
    expect(secondRowFields).toHaveLength(fields.rows[1].length);
    expect(secondRowFields[0].name).toEqual(fields.rows[1][0]);
  });

  it('renders an input group for each field in a row', () => {
    render(<AdvancedSearchTextInputs fields={fields} />);
    const fieldGroups = elements(
      '.advanced-search__row:nth-of-type(1) .advanced-search__group'
    );
    expect(fieldGroups).toHaveLength(fields.rows[0].length);
  });

  it('renders a text input within each input group', () => {
    render(<AdvancedSearchTextInputs fields={fields} />);
    const inputs = elements('.advanced-search__group input');
    expect(inputs).toHaveLength(fields.data.length);
  });

  it('assigns the name and id attribute corresponding to the field name', () => {
    render(<AdvancedSearchTextInputs fields={fields} />);
    const inputs = elements('.advanced-search__group input');
    expect(inputs[0].name).toEqual(fields.data[0].name);
    expect(inputs[0].id).toEqual(fields.data[0].name);
    expect(inputs[1].name).toEqual(fields.data[1].name);
    expect(inputs[1].id).toEqual(fields.data[1].name);
  });

  it('assigns a placeholder to each attribute corresponding to the label text', () => {
    render(<AdvancedSearchTextInputs fields={fields} />);
    const inputs = elements('.advanced-search__group input');
    expect(inputs[0].placeholder).toEqual(fields.data[0].label);
    expect(inputs[1].placeholder).toEqual(fields.data[1].label);
  });

  it('creates a label for each field', () => {
    render(<AdvancedSearchTextInputs fields={fields} />);
    const labels = elements('label');
    expect(labels).toHaveLength(fields.data.length);
  });

  it('displays the label text matching the field label', () => {
    render(<AdvancedSearchTextInputs fields={fields} />);
    const labels = elements('label');
    expect(labels[0].textContent).toEqual(fields.data[0].label);
    expect(labels[1].textContent).toEqual(fields.data[1].label);
  });

  it('assigns the right for attribute to each label', () => {
    render(<AdvancedSearchTextInputs fields={fields} />);
    const labels = elements('label');
    expect(labels[0].htmlFor).toEqual(fields.data[0].name);
    expect(labels[1].htmlFor).toEqual(fields.data[1].name);
  });

  it('includes the size of the field in the class name', () => {
    render(<AdvancedSearchTextInputs fields={fields} />);
    const inputs = elements('input');
    expect(inputs[0].classList).toContain(
      `form__input--${fields.data[0].size}`
    );
  });

  describe('rowFieldData', () => {
    it('returns an array of field input data corresponding to the fields in row array', () => {
      const row = ['name1', 'name3'];
      const fieldData = [
        { name: 'name1' },
        { name: 'name2' },
        { name: 'name3' },
      ];
      expect(rowFieldsData(row, fieldData)).toEqual([
        { name: 'name1' },
        { name: 'name3' },
      ]);
    });
  });
});

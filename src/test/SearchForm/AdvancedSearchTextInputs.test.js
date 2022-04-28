import React from 'react';
import { AdvancedSearchInputs } from '../../components/SearchForm/AdvancedSearchInputs/AdvancedSearchInputs';
import { createContainer } from '../domManipulators';

describe('AdvancedSearchInputs', () => {
  let render, element, elements;

  beforeEach(() => {
    ({ render, element, elements } = createContainer());
  });

  it('renders the advancedSearch div', () => {
    render(<AdvancedSearchInputs />);
    expect(element('#advancedSearchTextInputs')).not.toBeNull();
  });

  const fields = {
    rows: [
      [
        { name: 'field1name', label: 'Field1label', size: 'short' },
        { name: 'field3name', label: 'Field3label', size: 'long' },
      ],
      [{ name: 'field2name', label: 'Field2label', size: 'long' }],
    ],
  };

  //iterates over field rows to accumulate array of field objects
  const fieldObjectArr = () => {
    let fieldObjects = [];
    fields.rows.forEach(
      (row) => (fieldObjects = [...fieldObjects, ...row])
    );
    return fieldObjects;
  };

  it('renders a field row div element for each row', () => {
    render(<AdvancedSearchInputs fieldData={fields} />);
    const fieldRows = elements('.advanced-inputs__row');
    expect(fieldRows).toHaveLength(fields.rows.length);
  });

  it('renders the right fields within each row', () => {
    render(<AdvancedSearchInputs fieldData={fields} />);
    const firstRowFields = elements(
      '.advanced-inputs__row:nth-of-type(1) input'
    );

    expect(firstRowFields).not.toBeNull();
    expect(firstRowFields).toHaveLength(fields.rows[0].length);
    expect(firstRowFields[0].name).toEqual(fields.rows[0][0].name);
    expect(firstRowFields[1].name).toEqual(fields.rows[0][1].name);
    const secondRowFields = elements(
      '.advanced-inputs__row:nth-of-type(2) input'
    );
    expect(secondRowFields).toHaveLength(fields.rows[1].length);
    expect(secondRowFields[0].name).toEqual(fields.rows[1][0].name);
  });

  it('renders an input group for each field in a row', () => {
    render(<AdvancedSearchInputs fieldData={fields} />);
    const fieldGroups = elements(
      '.advanced-inputs__row:nth-of-type(1) .advanced-inputs__group'
    );
    expect(fieldGroups).toHaveLength(fields.rows[0].length);
  });

  it('renders a text input within each input group', () => {
    render(<AdvancedSearchInputs fieldData={fields} />);
    const inputs = elements('.advanced-inputs__group input');
    expect(inputs).toHaveLength(fieldObjectArr().length);
  });

  it('assigns the name and id attribute corresponding to the field name', () => {
    render(<AdvancedSearchInputs fieldData={fields} />);
    const inputs = elements('.advanced-inputs__group input');
    expect(inputs[0].name).toEqual(fieldObjectArr()[0].name);
    expect(inputs[0].id).toEqual(fieldObjectArr()[0].name);
    expect(inputs[1].name).toEqual(fieldObjectArr()[1].name);
    expect(inputs[1].id).toEqual(fieldObjectArr()[1].name);
  });

  it('assigns a placeholder to each attribute corresponding to the label text', () => {
    render(<AdvancedSearchInputs fieldData={fields} />);
    const inputs = elements('.advanced-inputs__group input');
    expect(inputs[0].placeholder).toEqual(fieldObjectArr()[0].label);
    expect(inputs[1].placeholder).toEqual(fieldObjectArr()[1].label);
  });

  it('creates a label for each field', () => {
    render(<AdvancedSearchInputs fieldData={fields} />);
    const labels = elements('label');
    expect(labels).toHaveLength(fieldObjectArr().length);
  });

  it('displays the label text matching the field label', () => {
    render(<AdvancedSearchInputs fieldData={fields} />);
    const labels = elements('label');
    expect(labels[0].textContent).toEqual(fieldObjectArr()[0].label);
    expect(labels[1].textContent).toEqual(fieldObjectArr()[1].label);
  });

  it('assigns the right for attribute to each label', () => {
    render(<AdvancedSearchInputs fieldData={fields} />);
    const labels = elements('label');
    expect(labels[0].htmlFor).toEqual(fieldObjectArr()[0].name);
    expect(labels[1].htmlFor).toEqual(fieldObjectArr()[1].name);
  });

  it('includes the physical size of the field in the class name', () => {
    render(<AdvancedSearchInputs fieldData={fields} />);
    const inputs = elements('input');
    expect(inputs[0].classList).toContain(
      `form__input--${fieldObjectArr()[0].size}`
    );
  });

  it('includes the physical size of the field in the class name', () => {
    render(<AdvancedSearchInputs fieldData={fields} />);
    const inputs = elements('input');
    expect(inputs[0].classList).toContain(
      `form__input--${fieldObjectArr()[0].size}`
    );
  });

  it('adds the pitches only checkbox group when the form contains melodicIncipit', () => {
    const fieldsWithIncipit = {
      rows: [
        [
          {
            name: 'melodicIncipit',
            label: 'MelodicIncipit',
            size: 'short',
          },
        ],
      ],
    };
    render(<AdvancedSearchInputs fieldData={fieldsWithIncipit} />);
    expect(
      element('input[name="pitchesOnly"][type="checkbox"]')
    ).not.toBeNull();
  });

  it('displays the isSecular field as a select element', () => {
    const fieldsWithIsSecular = {
      rows: [
        [
          {
            name: 'isSecular',
            label: 'Secular',
            size: 'short',
          },
        ],
      ],
    };
    render(<AdvancedSearchInputs fieldData={fieldsWithIsSecular} />);
    expect(element('select[name="isSecular"]')).not.toBeNull();
  });
});

import React from 'react';
import { createContainer } from './domManipulators';
import {
  TableSelectRadios,
  TableSelectRadio,
} from '../components/SearchForm/TableSelectRadios/TableSelectRadios';

describe('TableSelectRadios', () => {
  let render, element, elements, change, inputsOfType, labelFor;

  beforeEach(() => {
    ({ render, element, elements, change, inputsOfType, labelFor } =
      createContainer());
  });

  const tableSelectFields = [
    {
      value: 'option1',
      label: 'Option1',
    },
    {
      value: 'option2',
      label: 'Option2',
    },
  ];

  it('renders the TableSelectRadios container element', () => {
    render(<TableSelectRadios />);
    expect(element('div#tableSelectRadios')).not.toBeNull();
  });

  it('renders a radio button for each option', () => {
    render(<TableSelectRadios fieldData={tableSelectFields} />);
    const radioButtons = inputsOfType('radio');
    expect(radioButtons).toHaveLength(tableSelectFields.length);
  });

  it('renders the right label text', () => {
    render(<TableSelectRadios fieldData={tableSelectFields} />);
    expect(labelFor(tableSelectFields[1].value)).not.toBeNull();
    expect(labelFor(tableSelectFields[1].value).textContent).toEqual(
      tableSelectFields[1].label
    );
  });

  it('assigns an id to each radio option that matches the label id', () => {
    render(<TableSelectRadios fieldData={tableSelectFields} />);
    const radioButtons = elements('#tableSelectRadios input');
    expect(radioButtons[0].id).toEqual(tableSelectFields[0].value);
    expect(radioButtons[1].id).toEqual(tableSelectFields[1].value);
  });

  it('returns the name of the table when selection is changed', () => {
    let radioClicked;
    render(
      <TableSelectRadios
        fieldData={tableSelectFields}
        handleTableChange={({ target }) =>
          (radioClicked = target.value)
        }
      />
    );
    change(element(`input[id="${tableSelectFields[1].value}"]`));
    expect(radioClicked).toEqual(tableSelectFields[1].value);
  });
});

describe('TableSelectRadio', () => {
  let render, element, change;

  beforeEach(() => {
    ({ render, element, change } = createContainer());
  });

  it('initially selects the selected option', () => {
    render(<TableSelectRadio selected={true} />);
    expect(element('input').checked).toEqual(true);
  });

  it('initially does not selected non-selected options', () => {
    render(<TableSelectRadio selected={false} />);
    expect(element('input').checked).toEqual(false);
  });

  it('returns the name of the table when selection is changed', () => {
    const table = 'table1';
    let radioClicked;
    render(
      <TableSelectRadio
        selected={false}
        value={table}
        handleTableChange={({ target }) =>
          (radioClicked = target.value)
        }
      />
    );
    change(element('input'));
    expect(radioClicked).toEqual(table);
  });
});

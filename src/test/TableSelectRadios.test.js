import React from 'react';
import { createContainer } from './domManipulators';
import {
  TableSelectRadios,
  TableSelectOption,
} from '../components/SearchForm/TableSelectRadios';

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
    expect(element('div#TableSelectRadios')).not.toBeNull();
  });

  it('renders a radio button for each option', () => {
    render(
      <TableSelectRadios tableSelectFields={tableSelectFields} />
    );
    const radioButtons = inputsOfType('radio');
    expect(radioButtons).toHaveLength(tableSelectFields.length);
  });

  it('renders the right label text', () => {
    render(
      <TableSelectRadios tableSelectFields={tableSelectFields} />
    );
    expect(labelFor(tableSelectFields[1].value)).not.toBeNull();
    expect(labelFor(tableSelectFields[1].value).textContent).toEqual(
      tableSelectFields[1].label
    );
  });

  it('assigns an id to each radio option that matches the label id', () => {
    render(
      <TableSelectRadios tableSelectFields={tableSelectFields} />
    );
    const radioButtons = elements('#TableSelectRadios input');
    expect(radioButtons[0].id).toEqual(tableSelectFields[0].value);
    expect(radioButtons[1].id).toEqual(tableSelectFields[1].value);
  });

  it('returns the name of the table when selection is changed', () => {
    let TableSelectRadiosed;
    render(
      <TableSelectRadios
        tableSelectFields={tableSelectFields}
        handleTableChange={({ target }) =>
          (TableSelectRadiosed = target.value)
        }
      />
    );
    change(element(`input[id="${tableSelectFields[1].value}"]`));
    expect(TableSelectRadiosed).toEqual(tableSelectFields[1].value);
  });
});

describe('TableSelectOption', () => {
  let render, element, change;

  beforeEach(() => {
    ({ render, element, change } = createContainer());
  });

  it('initially selects the selected option', () => {
    render(<TableSelectOption selected={true} />);
    expect(element('input').checked).toEqual(true);
  });

  it('initially does not selected non-selected options', () => {
    render(<TableSelectOption selected={false} />);
    expect(element('input').checked).toBeFalsy();
  });

  it('returns the name of the table when selection is changed', () => {
    const table = 'table1';
    let TableSelectRadiosed;
    render(
      <TableSelectOption
        selected={false}
        value={table}
        handleTableChange={({ target }) =>
          (TableSelectRadiosed = target.value)
        }
      />
    );
    change(element('input'));
    expect(TableSelectRadiosed).toEqual(table);
  });
});

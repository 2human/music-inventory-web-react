import React from 'react';
import { SingleRowView } from '../../components/SingleRowView/SingleRowView';
import { createContainer } from '../domManipulators';

describe('SingleRowView', () => {
  let render, element, elements;

  const fields = [
    { name: 'field1', label: 'field1label' },
    { name: 'field2', label: 'field2label' },
  ];

  const data = {
    field1: 'field1value',
    field2: 'field2value',
  };

  beforeEach(() => {
    ({ render, element, elements } = createContainer());
  });

  it('renders the #singleRowView element', () => {
    render(<SingleRowView />);
    expect(element('div#singleRowView')).not.toBeNull();
  });

  describe('colgroup', () => {
    it('element is rendered', () => {
      render(<SingleRowView />);
      expect(element('table colgroup')).not.toBeNull();
    });

    it('renders the label and data col elements', () => {
      render(<SingleRowView />);
      expect(
        element('col.table__single-view-column--label')
      ).not.toBeNull();
      expect(
        element('col.table__single-view-column--data')
      ).not.toBeNull();
    });
  });

  it('renders a row for each field', () => {
    render(<SingleRowView fields={fields} />);
    const rows = elements('tr.table__row');
    expect(rows).toHaveLength(fields.length);
  });

  it('renders two td cells within each row', () => {
    render(<SingleRowView fields={fields} />);
    const firstRowCells = elements('tr:nth-of-type(1) td');
    expect(firstRowCells).toHaveLength(2);
    const secondRowCells = elements('tr:nth-of-type(2) td');
    expect(secondRowCells).toHaveLength(2);
  });

  it('renders the field label in the first data cell', () => {
    render(<SingleRowView fields={fields} />);
    const firstRowCells = elements('tr:nth-of-type(1) td');
    expect(firstRowCells[0].textContent).toEqual(fields[0].label);
  });

  it('renders the data corresponding to the field name of the row', () => {
    render(<SingleRowView fields={fields} data={data} />);
    const firstRowCells = elements('tr:nth-of-type(1) td');
    expect(firstRowCells[1].textContent).toEqual(
      data[fields[0].name]
    );
  });
});

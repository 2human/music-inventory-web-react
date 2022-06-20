import React from 'react';
import { SingleRowView } from '../../components/SingleRowView/SingleRowView';
import { createContainer } from '../domManipulators';

describe('SingleRowView', () => {
  let render, element, elements, change, form, submit, activeElement;

  const fields = [
    { name: 'field1', label: 'field1label' },
    { name: 'field2', label: 'field2label' },
  ];

  const data = {
    field1: 'field1value',
    field2: 'field2value',
  };

  beforeEach(() => {
    ({
      render,
      element,
      elements,
      change,
      submit,
      form,
      activeElement,
    } = createContainer());
  });

  it('renders the #singleRowView element', () => {
    render(<SingleRowView />);
    expect(element('table#singleRowView')).not.toBeNull();
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
});

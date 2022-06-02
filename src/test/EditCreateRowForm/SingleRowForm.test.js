import React from 'react';
import { SingleRowForm } from '../../components/SingleRowForm/SingleRowForm';
import { createContainer } from '../domManipulators';

describe('SingleRowForm', () => {
  let render, element, elements, click, inputsOfType;

  const fields = [
    { name: 'field1', label: 'field1label' },
    { name: 'field2', label: 'field2label' },
  ];

  const data = {
    field1: 'field1value',
    field2: 'field2value',
  };

  beforeEach(() => {
    ({ render, element, elements, click, inputsOfType } =
      createContainer());
  });

  it('renders the #editCreateRow form element', () => {
    render(<SingleRowForm />);

    expect(element('form#editCreateRow')).not.toBeNull();
  });

  describe('labels', () => {
    it('renders a label for each field', () => {
      render(<SingleRowForm fields={fields} />);
      expect(elements('label')).toHaveLength(fields.length);
    });
    it('sets the label for attribute for each as the field name', () => {
      render(<SingleRowForm fields={fields} />);
      const labels = elements('label');
      console.log(labels[0].value);
      expect(labels[0].htmlFor).toEqual(fields[0].name);
      expect(labels[1].htmlFor).toEqual(fields[1].name);
    });

    it('displays the right label text', () => {
      render(<SingleRowForm fields={fields} />);
      const labels = elements('label');
      expect(labels[0].textContent).toEqual(fields[0].label);
      expect(labels[1].textContent).toEqual(fields[1].label);
    });
  });

  describe('inputs', () => {
    it('renders an input element for each field', () => {
      render(<SingleRowForm fields={fields} />);
      expect(elements('input').length).toEqual(fields.length);
    });

    it('are of type "text" by default', () => {
      render(<SingleRowForm fields={fields} />);
      const inputs = elements('input');
      expect(inputs[0].type).toEqual('text');
      expect(inputs[1].type).toEqual('text');
    });

    it('have an id and name corresponding to its field name', () => {
      render(<SingleRowForm fields={fields} />);
      const inputs = elements('input');
      expect(inputs[0].name).toEqual(fields[0].name);
      expect(inputs[0].id).toEqual(fields[0].name);
      expect(inputs[1].name).toEqual(fields[1].name);
      expect(inputs[1].id).toEqual(fields[1].name);
    });

    it('have values corresponding to data provided, if any', () => {
      render(<SingleRowForm fields={fields} data={data} />);

      const inputs = elements('input');
      expect(inputs[0].value).toEqual(data[fields[0].name]);
      expect(inputs[1].value).toEqual(data[fields[1].name]);
    });

    it('has empty strings as values when no data provided', () => {
      render(<SingleRowForm fields={fields} />);

      const inputs = elements('input');
      expect(inputs[0].value).toEqual('');
      expect(inputs[1].value).toEqual('');
    });

    it.skip('updates the value of text inputs when text is input', () => {
      render(<SingleRowForm fields={fields} data={data} />);
      const inputs = elements('input');
      change(inputs[1], withEvent(fields[1].name, 'newtext'));
      expect(inputs[1].value).toEqual('newText');
    });
  });
});

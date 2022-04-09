import React from 'react';
import { createContainer } from './domManipulators';
import {
  FieldSelect,
  FieldSelectOption,
} from '../components/SearchForm/FieldSelect';

describe('FieldSelect', () => {
  let render, element, elements, labelFor, change;

  beforeEach(() => {
    ({ render, element, elements, labelFor, change } =
      createContainer());
  });

  const fieldOptions = [
    {
      name: 'option1',
      label: 'Option11',
    },
    {
      name: 'option2',
      label: 'Option2',
    },
  ];

  it('renders the fieldSelect div element', () => {
    render(<FieldSelect />);
    expect(element('div#fieldSelect')).not.toBeNull();
  });

  it('renders a checkbox element for each field select option', () => {
    render(<FieldSelect fieldOptions={fieldOptions} />);
    expect(elements('input[type="checkbox"]')).toHaveLength(
      fieldOptions.length
    );
  });

  it('renders each checkbox element with the right values', () => {
    render(<FieldSelect fieldOptions={fieldOptions} />);
    const checkboxes = elements('input[type="checkbox"]');
    expect(checkboxes[0].value).toEqual(fieldOptions[0].name);
    expect(checkboxes[1].value).toEqual(fieldOptions[1].name);
  });

  it('renders each checkbox element with the right name', () => {
    render(<FieldSelect fieldOptions={fieldOptions} />);
    const checkboxes = elements('input[type="checkbox"]');
    expect(checkboxes[0].name).toEqual(fieldOptions[0].name);
    expect(checkboxes[1].name).toEqual(fieldOptions[1].name);
  });

  it('renders a label element for each field select option', () => {
    render(<FieldSelect fieldOptions={fieldOptions} />);
    expect(elements('label')).toHaveLength(fieldOptions.length);
  });

  it('renders each label element with the right text', () => {
    render(<FieldSelect fieldOptions={fieldOptions} />);
    const labels = elements('label');
    expect(labels[0].textContent).toEqual(fieldOptions[0].label);
    expect(labels[1].textContent).toEqual(fieldOptions[1].label);
  });

  it('renders the right label text', () => {
    render(<FieldSelect fieldOptions={fieldOptions} />);
    expect(labelFor(fieldOptions[1].name)).not.toBeNull();
    expect(labelFor(fieldOptions[1].name).textContent).toEqual(
      fieldOptions[1].label
    );
  });

  it('assigns an id to each checkbox that matches its label id', () => {
    render(<FieldSelect fieldOptions={fieldOptions} />);
    const checkboxes = elements('input[type="checkbox"]');
    expect(checkboxes[0].id).toEqual(fieldOptions[0].name);
    expect(checkboxes[1].id).toEqual(fieldOptions[1].name);
  });

  it('displays the correct checkbox ids', () => {
    render(<FieldSelect fieldOptions={fieldOptions} />);
    expect(labelFor(fieldOptions[0].name).textContent).toEqual(
      fieldOptions[0].label
    );
    expect(labelFor(fieldOptions[1].name).textContent).toEqual(
      fieldOptions[1].label
    );
  });

  it('returns the right checkbox element when a checkbox is changed', () => {
    let fieldChanged;
    render(
      <FieldSelect
        fieldOptions={fieldOptions}
        handleFieldChange={({ target }) =>
          (fieldChanged = target.value)
        }
      />
    );
    change(element(`input[id="${fieldOptions[0].name}"`));
    expect(fieldChanged).toEqual(fieldOptions[0].name);
  });

  it('checks off checkboxes with names matching elements in selectedFields array', () => {
    const selectedFields = [fieldOptions[0].name];
    render(
      <FieldSelect
        selectedFields={selectedFields}
        fieldOptions={fieldOptions}
      />
    );
    expect(
      element(`input[id="${fieldOptions[0].name}"`).checked
    ).toEqual(true);
  });

  it('does not check off checkboxes whose names do not appear in selectedFields array', () => {
    const selectedFields = [fieldOptions[0].name];
    render(
      <FieldSelect
        selectedFields={selectedFields}
        fieldOptions={fieldOptions}
      />
    );
    expect(
      element(`input[id="${fieldOptions[1].name}"`).checked
    ).toEqual(false);
  });
});

describe('FieldSelectOption', () => {
  let render, element, change;

  beforeEach(() => {
    ({ render, element, change } = createContainer());
  });

  it('sets the checked attribute to true if it isSelected is true', () => {
    const field = 'field1';
    render(
      <FieldSelectOption
        name={field}
        isSelected={true}
        handleFieldChange={({ target }) =>
          (fieldChanged = target.value)
        }
      />
    );
    expect(element('input').checked).toEqual(true);
  });

  it('sets the checked attribute to false if it isSelected is false', () => {
    const field = 'field1';
    render(
      <FieldSelectOption
        name={field}
        isSelected={false}
        handleFieldChange={({ target }) =>
          (fieldChanged = target.value)
        }
      />
    );
    expect(element('input').checked).toEqual(false);
  });

  it('returns the name of the checkbox changed', () => {
    const field = 'field1';
    let fieldChanged;
    render(
      <FieldSelectOption
        name={field}
        handleFieldChange={({ target }) =>
          (fieldChanged = target.value)
        }
      />
    );
    change(element('input'));
    expect(fieldChanged).toEqual(field);
  });
});

import React from 'react';
import { createContainer } from './domManipulators';
import {
  BasicSearchCheckboxes,
  BasicSearchCheckboxOption,
} from '../components/SearchForm/BasicSearchCheckboxes';

describe('BasicSearchCheckboxes', () => {
  let render, element, elements, labelFor, inputsOfType, change;

  beforeEach(() => {
    ({ render, element, elements, labelFor, inputsOfType, change } =
      createContainer());
  });

  const fieldOptions = [
    {
      value: 'option1',
      label: 'Option11',
    },
    {
      value: 'option2',
      label: 'Option2',
    },
  ];

  it('renders the BasicSearchCheckboxes div element', () => {
    render(<BasicSearchCheckboxes />);
    expect(element('div#basicSearchCheckboxes')).not.toBeNull();
  });

  it('renders a checkbox element for each field select option', () => {
    render(<BasicSearchCheckboxes fieldOptions={fieldOptions} />);
    expect(inputsOfType('checkbox')).toHaveLength(
      fieldOptions.length
    );
  });

  it('renders each checkbox element with the right values', () => {
    render(<BasicSearchCheckboxes fieldOptions={fieldOptions} />);
    const checkboxes = inputsOfType('checkbox');
    expect(checkboxes[0].value).toEqual(fieldOptions[0].value);
    expect(checkboxes[1].value).toEqual(fieldOptions[1].value);
  });

  it('renders each checkbox element with the right name', () => {
    render(<BasicSearchCheckboxes fieldOptions={fieldOptions} />);
    const checkboxes = inputsOfType('checkbox');
    expect(checkboxes[0].name).toEqual('field');
    expect(checkboxes[1].name).toEqual('field');
  });

  it('renders a label element for each field select option', () => {
    render(<BasicSearchCheckboxes fieldOptions={fieldOptions} />);
    expect(elements('label')).toHaveLength(fieldOptions.length);
  });

  it('renders each label element with the right text', () => {
    render(<BasicSearchCheckboxes fieldOptions={fieldOptions} />);
    const labels = elements('label');
    expect(labels[0].textContent).toEqual(fieldOptions[0].label);
    expect(labels[1].textContent).toEqual(fieldOptions[1].label);
  });

  it('renders the right label text', () => {
    render(<BasicSearchCheckboxes fieldOptions={fieldOptions} />);
    expect(labelFor(fieldOptions[1].value)).not.toBeNull();
    expect(labelFor(fieldOptions[1].value).textContent).toEqual(
      fieldOptions[1].label
    );
  });

  it('assigns an id to each checkbox that matches its label id', () => {
    render(<BasicSearchCheckboxes fieldOptions={fieldOptions} />);
    const checkboxes = inputsOfType('checkbox');
    expect(checkboxes[0].id).toEqual(fieldOptions[0].value);
    expect(checkboxes[1].id).toEqual(fieldOptions[1].value);
  });

  it('displays the correct checkbox ids', () => {
    render(<BasicSearchCheckboxes fieldOptions={fieldOptions} />);
    expect(labelFor(fieldOptions[0].value).textContent).toEqual(
      fieldOptions[0].label
    );
    expect(labelFor(fieldOptions[1].value).textContent).toEqual(
      fieldOptions[1].label
    );
  });

  it('returns the right checkbox element when a checkbox is changed', () => {
    let fieldChanged;
    render(
      <BasicSearchCheckboxes
        fieldOptions={fieldOptions}
        handleFieldChange={({ target }) =>
          (fieldChanged = target.value)
        }
      />
    );
    change(element(`input[id="${fieldOptions[0].value}"`));
    expect(fieldChanged).toEqual(fieldOptions[0].value);
  });

  it('checks off checkboxes with names matching elements in selectedFields array', () => {
    const selectedFields = [fieldOptions[0].value];
    render(
      <BasicSearchCheckboxes
        selectedFields={selectedFields}
        fieldOptions={fieldOptions}
      />
    );
    expect(
      element(`input[id="${fieldOptions[0].value}"`).checked
    ).toEqual(true);
  });

  it('does not check off checkboxes whose names do not appear in selectedFields array', () => {
    const selectedFields = [fieldOptions[0].value];
    render(
      <BasicSearchCheckboxes
        selectedFields={selectedFields}
        fieldOptions={fieldOptions}
      />
    );
    expect(
      element(`input[id="${fieldOptions[1].value}"`).checked
    ).toEqual(false);
  });
});

describe('BasicSearchCheckboxOption', () => {
  let render, element, change;

  beforeEach(() => {
    ({ render, element, change } = createContainer());
  });

  it('sets the checked attribute to true if it isSelected is true', () => {
    const field = 'field1';
    render(
      <BasicSearchCheckboxOption
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
      <BasicSearchCheckboxOption
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
      <BasicSearchCheckboxOption
        value={field}
        handleFieldChange={({ target }) =>
          (fieldChanged = target.value)
        }
      />
    );
    change(element('input'));
    expect(fieldChanged).toEqual(field);
  });
});

import React from 'react';
import { createContainer } from '../domManipulators';
import {
  BasicSearchCheckboxes,
  BasicSearchCheckbox,
} from '../../components/SearchForm/BasicSearchCheckboxes/BasicSearchCheckboxes';

describe('BasicSearchCheckboxes', () => {
  let render, element, elements, labelFor, inputsOfType, change;

  beforeEach(() => {
    ({ render, element, elements, labelFor, inputsOfType, change } =
      createContainer());
  });

  const basicSearchFields = [
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
    render(<BasicSearchCheckboxes fieldData={basicSearchFields} />);
    expect(inputsOfType('checkbox')).toHaveLength(
      basicSearchFields.length
    );
  });

  it('renders each checkbox element with the right values', () => {
    render(<BasicSearchCheckboxes fieldData={basicSearchFields} />);
    const checkboxes = inputsOfType('checkbox');
    expect(checkboxes[0].value).toEqual(basicSearchFields[0].value);
    expect(checkboxes[1].value).toEqual(basicSearchFields[1].value);
  });

  it('renders each checkbox element with the right name', () => {
    render(<BasicSearchCheckboxes fieldData={basicSearchFields} />);
    const checkboxes = inputsOfType('checkbox');
    expect(checkboxes[0].name).toEqual('field');
    expect(checkboxes[1].name).toEqual('field');
  });

  it('renders a label element for each field select option', () => {
    render(<BasicSearchCheckboxes fieldData={basicSearchFields} />);
    expect(elements('label')).toHaveLength(basicSearchFields.length);
  });

  it('renders each label element with the right text', () => {
    render(<BasicSearchCheckboxes fieldData={basicSearchFields} />);
    const labels = elements('label');
    expect(labels[0].textContent).toEqual(basicSearchFields[0].label);
    expect(labels[1].textContent).toEqual(basicSearchFields[1].label);
  });

  it('renders the right label text', () => {
    render(<BasicSearchCheckboxes fieldData={basicSearchFields} />);
    expect(labelFor(basicSearchFields[1].value)).not.toBeNull();
    expect(labelFor(basicSearchFields[1].value).textContent).toEqual(
      basicSearchFields[1].label
    );
  });

  it('assigns an id to each checkbox that matches its label id', () => {
    render(<BasicSearchCheckboxes fieldData={basicSearchFields} />);
    const checkboxes = inputsOfType('checkbox');
    expect(checkboxes[0].id).toEqual(basicSearchFields[0].value);
    expect(checkboxes[1].id).toEqual(basicSearchFields[1].value);
  });

  it('displays the correct checkbox ids', () => {
    render(<BasicSearchCheckboxes fieldData={basicSearchFields} />);
    expect(labelFor(basicSearchFields[0].value).textContent).toEqual(
      basicSearchFields[0].label
    );
    expect(labelFor(basicSearchFields[1].value).textContent).toEqual(
      basicSearchFields[1].label
    );
  });

  it('returns the right checkbox element when a checkbox is changed', () => {
    let fieldChanged;
    render(
      <BasicSearchCheckboxes
        fieldData={basicSearchFields}
        handleFieldChange={({ target }) =>
          (fieldChanged = target.value)
        }
      />
    );
    change(element(`input[id="${basicSearchFields[0].value}"`));
    expect(fieldChanged).toEqual(basicSearchFields[0].value);
  });

  it('checks off checkboxes with names matching elements in selectedFields array', () => {
    const selectedFields = [basicSearchFields[0].value];
    render(
      <BasicSearchCheckboxes
        selectedFields={selectedFields}
        fieldData={basicSearchFields}
      />
    );
    expect(
      element(`input[id="${basicSearchFields[0].value}"`).checked
    ).toEqual(true);
  });

  it('does not check off checkboxes whose names do not appear in selectedFields array', () => {
    const selectedFields = [basicSearchFields[0].value];
    render(
      <BasicSearchCheckboxes
        selectedFields={selectedFields}
        fieldData={basicSearchFields}
      />
    );
    expect(
      element(`input[id="${basicSearchFields[1].value}"`).checked
    ).toEqual(false);
  });
});

describe('BasicSearchCheckbox', () => {
  let render, element, change;

  beforeEach(() => {
    ({ render, element, change } = createContainer());
  });

  it('sets the checked attribute to true if it isSelected is true', () => {
    const field = 'field1';
    render(
      <BasicSearchCheckbox
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
      <BasicSearchCheckbox
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
      <BasicSearchCheckbox
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

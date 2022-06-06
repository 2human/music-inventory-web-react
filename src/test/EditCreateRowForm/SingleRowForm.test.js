import { click } from '@testing-library/user-event/dist/click';
import React from 'react';
import { SingleRowForm } from '../../components/SingleRowForm/SingleRowForm';
import { initialFormInputs } from '../../components/SingleRowForm/singleRowFormHelpers';
import { createContainer, withEvent } from '../domManipulators';

describe('SingleRowForm', () => {
  let render, element, elements, change, inputsOfType;

  const fields = [
    { name: 'field1', label: 'field1label' },
    { name: 'field2', label: 'field2label' },
  ];

  const data = {
    field1: 'field1value',
    field2: 'field2value',
  };

  beforeEach(() => {
    ({ render, element, elements, change, inputsOfType } =
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

  describe('text input', () => {
    it('is rendered for each field by default', () => {
      render(<SingleRowForm fields={fields} />);
      const inputs = elements('input');
      expect(inputs).toHaveLength(fields.length);
      expect(inputs[0].type).toEqual('text');
      expect(inputs[1].type).toEqual('text');
    });

    it('has an id and name corresponding to its field name', () => {
      render(<SingleRowForm fields={fields} />);
      const inputs = elements('input');
      expect(inputs[0].name).toEqual(fields[0].name);
      expect(inputs[0].id).toEqual(fields[0].name);
      expect(inputs[1].name).toEqual(fields[1].name);
      expect(inputs[1].id).toEqual(fields[1].name);
    });

    it('has a value corresponding to data provided, if any', () => {
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

    it('updates the value when text is changed', () => {
      render(<SingleRowForm fields={fields} />);

      const inputs = elements('input');
      change(inputs[1], withEvent(fields[1].name, 'newtext'));
      expect(inputs[1].value).toEqual('newtext');
    });
  });

  describe('checkbox input', () => {
    const fields = [{ name: 'isSecular', label: '' }];

    it('is rendered when the field name is isSecular', () => {
      render(<SingleRowForm fields={fields} />);

      const checkboxes = elements('input[type="checkbox"]');
      expect(checkboxes).toHaveLength(1);
    });

    it('has the right attributes', () => {
      render(<SingleRowForm fields={fields} />);

      const checkboxes = elements('input[type="checkbox"]');
      expect(checkboxes[0].value).toEqual(fields[0].name);
      expect(checkboxes[0].id).toEqual(fields[0].name);
      expect(checkboxes[0].name).toEqual(fields[0].name);
    });

    it('is checked off when isSecular value is "true"', () => {
      const data = { isSecular: 'true' };
      render(<SingleRowForm fields={fields} data={data} />);

      const checkboxes = elements('input[type="checkbox"]');
      expect(checkboxes[0].checked).toEqual(true);
    });

    it('is not checked off when isSecular value is "false"', () => {
      const data = { isSecular: 'false' };
      render(<SingleRowForm fields={fields} data={data} />);

      const checkboxes = elements('input[type="checkbox"]');
      expect(checkboxes[0].checked).toEqual(false);
    });

    it('is not checked off when no data is provided', () => {
      render(<SingleRowForm fields={fields} />);

      const checkboxes = elements('input[type="checkbox"]');
      expect(checkboxes[0].checked).toEqual(false);
    });

    it('checks off the checkbox when clicked', () => {
      const data = { isSecular: 'false' };
      render(<SingleRowForm fields={fields} />);

      const checkboxes = elements('input[type="checkbox"]');
      change(checkboxes[0]);
      expect(checkboxes[0].checked).toEqual(true);
    });
  });

  describe('textbox', () => {
    const fields = [
      { name: 'inscription', label: '' },
      { name: 'description', label: '' },
    ];

    const data = {
      inscription: 'inscriptionvalue',
      description: 'descriptionvalue',
    };

    it('is rendered when field name is "inscription" or "description"', () => {
      render(<SingleRowForm fields={fields} />);

      expect(elements('textarea')).toHaveLength(fields.length);
    });

    it('has an id and name corresponding to its field name', () => {
      render(<SingleRowForm fields={fields} />);

      const textareas = elements('textarea');
      expect(textareas[0].name).toEqual(fields[0].name);
      expect(textareas[0].id).toEqual(fields[0].name);
      expect(textareas[1].name).toEqual(fields[1].name);
      expect(textareas[1].id).toEqual(fields[1].name);
    });

    it('has a value corresponding to data provided, if any', () => {
      render(<SingleRowForm fields={fields} data={data} />);

      const textareas = elements('textarea');
      expect(textareas[0].value).toEqual(data[fields[0].name]);
      expect(textareas[1].value).toEqual(data[fields[1].name]);
    });

    it('updates the value when text is changed', () => {
      render(<SingleRowForm fields={fields} />);

      const textareas = elements('textarea');
      change(textareas[1], withEvent(fields[1].name, 'newtext'));
      expect(textareas[1].value).toEqual('newtext');
    });
  });

  describe('edit mode', () => {
    //edit mode is active when data object is provided
    it('renders the "Update" button', () => {
      render(<SingleRowForm fields={fields} data={data} />);

      const updateBtn = element('button#updateRow');
      expect(updateBtn).not.toBeNull();
      expect(updateBtn.textContent).toEqual('Update');
    });

    it('returns the formInputs when "Update" button is clicked', () => {
      const updateSpy = jest.fn();
      render(
        <SingleRowForm
          fields={fields}
          data={data}
          updateRow={updateSpy}
        />
      );

      const updateBtn = element('button#updateRow');
      click(updateBtn);
      expect(updateSpy).toHaveBeenCalledWith(data);
    });

    it('renders the "Delete" button', () => {
      render(<SingleRowForm fields={fields} data={data} />);

      const deleteBtn = element('button#deleteRow');
      expect(deleteBtn).not.toBeNull();
      expect(deleteBtn.textContent).toEqual('Delete');
    });

    it('displays the delete confirmation buttons and prompt after "Delete" button is clicked', () => {
      render(<SingleRowForm fields={fields} data={data} />);

      const deleteBtn = element('button#deleteRow');
      click(deleteBtn);

      expect(element('span#deleteConfirmPrompt')).not.toBeNull();

      const confirmDeleteBtn = element('button#confirmDelete');
      expect(confirmDeleteBtn).not.toBeNull();
      expect(confirmDeleteBtn.textContent).toEqual('Confirm');

      const cancelDeleteBtn = element('button#cancelDelete');
      expect(cancelDeleteBtn).not.toBeNull();
      expect(cancelDeleteBtn.textContent).toEqual('Cancel');
    });

    it('returns the formInputs id when "Delete" button is clicked and confirmed', () => {
      const dataWithId = { id: 999 };
      const deleteSpy = jest.fn();
      render(
        <SingleRowForm
          fields={fields}
          data={dataWithId}
          deleteRow={deleteSpy}
        />
      );

      const deleteBtn = element('button#deleteRow');
      click(deleteBtn);

      const confirmDeleteBtn = element('button#confirmDelete');
      click(confirmDeleteBtn);
      expect(deleteSpy).toHaveBeenCalledWith(dataWithId.id);
    });

    it('shows the "Update" and "Delete" buttons after "Delete" has been clicked and cancelled', () => {
      render(<SingleRowForm fields={fields} data={data} />);

      let deleteBtn = element('button#deleteRow');
      click(deleteBtn);

      //check for existence after click
      deleteBtn = element('button#deleteRow');
      expect(deleteBtn).toBeNull();

      const cancelDeleteBtn = element('button#cancelDelete');
      click(cancelDeleteBtn);

      //check for existence after cancel
      deleteBtn = element('button#deleteRow');

      expect(deleteBtn).not.toBeNull();
      const updateBtn = element('button#updateRow');
      expect(updateBtn).not.toBeNull();
    });
  });

  describe('create mode', () => {
    //create mode is active when no data object is provided
    it('renders the "Create" button', () => {
      render(<SingleRowForm fields={fields} />);

      const createBtn = element('button#createRow');
      expect(createBtn).not.toBeNull();
      expect(createBtn.textContent).toEqual('Create');
    });

    it('returns the formInputs when "Create" button is clicked', () => {
      const createSpy = jest.fn();
      render(<SingleRowForm fields={fields} createRow={createSpy} />);

      const createBtn = element('button#createRow');
      click(createBtn);
      expect(createSpy).toHaveBeenCalledWith({
        ...initialFormInputs({}, fields),
      });
    });

    it('returns the formInputs when "Create" button is clicked', () => {
      const createSpy = jest.fn();
      render(<SingleRowForm fields={fields} createRow={createSpy} />);

      const createBtn = element('button#createRow');
      click(createBtn);
      expect(createSpy).toHaveBeenCalledWith({
        ...initialFormInputs({}, fields),
      });
    });

    it('renders the "Clear" button', () => {
      render(<SingleRowForm fields={fields} />);

      const clearBtn = element('button#clearInputs');
      expect(clearBtn).not.toBeNull();
      expect(clearBtn.textContent).toEqual('Clear');
    });

    it('clears input values when "Clear" button is clicked', () => {
      render(<SingleRowForm fields={fields} />);

      //input text
      const inputs = elements('input');
      change(inputs[1], withEvent(fields[1].name, 'newtext'));
      expect(inputs[1].value).toEqual('newtext');

      //click clear and remove text
      const clearBtn = element('button#clearInputs');
      click(clearBtn);
      expect(inputs[1].value).toEqual('');
    });
  });
});

describe('singleRowFormHelpers', () => {
  describe('initialFormInputs', () => {
    const data = {
      field1: 'field1value',
      field2: 'field2value',
    };

    const fields = [
      { name: 'field1', label: 'field1label' },
      { name: 'field2', label: 'field2label' },
    ];

    it('returns the data object when it is not an empty object', () => {
      expect(initialFormInputs(data)).toEqual(data);
    });

    it('returns an object with properties corresponding to field names and empty strings as data when data object is empty', () => {
      expect(initialFormInputs({}, fields)).toEqual({
        field1: '',
        field2: '',
      });
    });
  });
});

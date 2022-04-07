import React from 'react';
import { createContainer } from './domManipulators';
import { FieldSelect } from '../components/SearchForm/FieldSelect';     


describe('FieldSelect', () => {
  let render, element, elements, labelFor;

  beforeEach(() => {
    ({ render, element, elements, labelFor } = createContainer());
  });

  const fieldOptions = [
    {
      name: 'option1',
      label: 'Option11'
    },
    {
      name: 'option2',
      label: 'Option2'
    }
  ];
  
  it('renders the fieldSelect div element', () => {
    render(<FieldSelect />);
    expect(element('div#fieldSelect')).not.toBeNull();
  });

  it('renders a checkbox element for each field select option', () => {
    render(<FieldSelect fieldOptions={fieldOptions} />);
    expect(elements('input[type="checkbox"]'))
      .toHaveLength(fieldOptions.length);
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
    expect(elements('label')).toHaveLength(fieldOptions.length)
  });

  it('renders each label element with the right text', () => {
    render(<FieldSelect fieldOptions={fieldOptions} />);
    const labels = elements('label');
    expect(labels[0].textContent).toEqual(fieldOptions[0].label);
    expect(labels[1].textContent).toEqual(fieldOptions[1].label);    
  });  

  it('renders the right label text', () => {    
    render(<FieldSelect fieldOptions={fieldOptions}/>);
    expect(labelFor(fieldOptions[1].name)).not.toBeNull();
    expect(labelFor(fieldOptions[1].name).textContent)
      .toEqual(fieldOptions[1].label); 
  });

  it('assigns an id to each checkbox that matches its label id', () => {
    render(<FieldSelect fieldOptions={fieldOptions} />);    const checkboxes = elements('input[type="checkbox"]');
    expect(checkboxes[0].id).toEqual(fieldOptions[0].name);
    expect(checkboxes[1].id).toEqual(fieldOptions[1].name);
  });

});
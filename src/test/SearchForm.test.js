import React from 'react';
import { createContainer } from './domManipulators';
import { SearchForm,
        TableSelect,
        TableSelectOption } from '../components/SearchForm/SearchForm';


describe('SearchForm', () => {
  let render, element, submit;  

  const form = id => element(`form[id="${id}"]`);

  beforeEach(() => {
    ({ render, element, submit } = createContainer());
  });

  it('renders the #searchForm element', () => {
    render(<SearchForm />);
    expect(element('form#searchForm')).not.toBeNull();
  });

  it('renders the basic search container div', () => {
    render(<SearchForm />);
    expect(element('#searchForm > div.search-form__basic-search'))
      .not.toBeNull();
  });

  it('renders the keyword search input container element', () => {
    render(<SearchForm />);
    const keywordInputContainer = 
      element('div.search-form__keyword-container');
    expect(keywordInputContainer).not.toBeNull();
  });

  it('renders the keyword search text input element', () => {
    render(<SearchForm />);
    const keywordTextInput = 
      element('.search-form__keyword-container > #keywordInput');
    expect(keywordTextInput).not.toBeNull();
  });  

  it('renders the keyword text input with the right attribures', () => {
    render(<SearchForm />);
    const keywordTextInput = 
      element('.search-form__keyword-container > #keywordInput');      
    expect(keywordTextInput.getAttribute('name'))
      .toEqual('searchText');
    expect(keywordTextInput.getAttribute('placeholder'))
    .toEqual('Keyword(s)');
    expect(keywordTextInput.getAttribute('maxLength'))
    .toEqual('200');    
    expect(keywordTextInput.getAttribute('size'))
    .toEqual('60');
  });

  it('renders the submit search button with the right text', () => {
    render(<SearchForm />);
    const submitBtn = 
      element('.search-form__keyword-container > #submitSearch');
    expect(submitBtn).not.toBeNull();
    expect(submitBtn.value).toEqual('Search');
  });

  it('renders the table select container element', () => {
    render(<SearchForm />);
    expect(element('#searchForm > #tableSelect')).not.toBeNull();
  });
  

  it('prevents default behavior on submission', async () => {  
    const preventDefaultSpy = jest.fn()
    render(<SearchForm />);
    await submit(form('searchForm'), {
      preventDefault: preventDefaultSpy
    });
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  
});

describe('TableSelect', () => {
  let render, element, elements;
  
  const labelFor = formElement =>
    element(`label[for="${formElement}"]`);

  beforeEach(() => {
    ({ render, element, elements } = createContainer());
  });

  const tableOptions = [
    {
      name: 'option1',
      label: 'Option11'
    },
    {
      name: 'option2',
      label: 'Option2'
    }
  ]

  it('renders the tableSelect container element', () => {
    render(<TableSelect />);
    expect(element('div#tableSelect')).not.toBeNull();
  });

  it('renders a radio button for each option', () => { 
    render(<TableSelect tableOptions={tableOptions}/>);
    const radioButtons = 
      elements('#tableSelect input[type="radio"]');
    expect(radioButtons).toHaveLength(tableOptions.length);
  }); 

  it('renders the right label text', () => {    
    render(<TableSelect tableOptions={tableOptions}/>);
    const radioLabels = 
      elements('#tableSelect label');
    expect(labelFor(tableOptions[1].name)).not.toBeNull();
    expect(labelFor(tableOptions[1].name).textContent)
      .toEqual(tableOptions[1].label); 
  });

  it('assigns an id to each radio option that matches the label id', () =>{
    render(<TableSelect tableOptions={tableOptions} />);
    const radioButtons = elements('#tableSelect input');
    expect(radioButtons[0].id).toEqual(tableOptions[0].name);
    expect(radioButtons[1].id).toEqual(tableOptions[1].name);
  });

  it('initially selects the selected option', () => {
    render(<TableSelectOption selected={true} />);
    expect(element('input').checked).toBeTruthy();
  });

  it('initially does not selected non-selected options', () => {
    render(<TableSelectOption selected={false} />);
    expect(element('input').checked).toBeFalsy();
  });
  

});
import React from 'react';
import { createContainer } from './domManipulators';
import { TableSelect,
        TableSelectOption
        } from '../components/SearchForm/TableSelect';        

describe('TableSelect', () => {
  let render, element, elements, change, labelFor;

  beforeEach(() => {
    ({ render, element, elements, change, labelFor } 
      = createContainer());
  });

  const tableOptions = [
    {
      name: 'option1',
      label: 'Option1'
    },
    {
      name: 'option2',
      label: 'Option2'
    }
  ];

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

  it('returns the name of the table when selection is changed', () => {
    let tableSelected;
    render(<TableSelect 
      tableOptions={tableOptions}
      handleTableChange={ ({ target }) => 
        tableSelected = target.value } 
    />
    );
    // console.log(elements('input'));
    change(element(`input[id="${tableOptions[1].name}"]`));
    expect(tableSelected).toEqual(tableOptions[1].name);
  });

});


describe('TableSelectOption', () => {
  let render, element, change;

  beforeEach(() => {
    ({ render, element, change } = createContainer());
  });  

  it('initially selects the selected option', () => {
    render(<TableSelectOption selected={true} />);
    expect(element('input').checked).toBeTruthy();
  });

  it('initially does not selected non-selected options', () => {
    render(<TableSelectOption selected={false} />);
    expect(element('input').checked).toBeFalsy();
  });  

  it('returns the name of the table when selection is changed', () => {   
    const table = 'table1';
    let tableSelected;
    render(<TableSelectOption 
      selected={false}
      name={table}
      handleTableChange={ ({ target }) => 
        tableSelected = target.value } 
    />
    );
    change(element('input'));
    expect(tableSelected).toEqual(table);
  });


});
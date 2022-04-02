import React from 'react';
import 'whatwg-fetch';
import { createContainer } from "./domManipulators";
import { PartDisplay } from "../components/ItemDisplay/PartDisplay";
import { fetchResponseOk,
          fetchResponseError,
          requestBodyOf
        } from './spyHelpers';

describe('PartDisplay', () => {    
  let render, element, click, change, submit;

  const form = id => element(`form[id="${id}"]`);
  const field = name => form('partDisplayForm').elements[name];
  const labelFor = formElement =>
    element(`label[for="${formElement}"]`);

  const part = {
    partNumber: 'pn1',
    partName: 'pname',
    uom: 'uom1',
    description: 'desctext',
    category: 'partcat'      
  };

  beforeEach(() => {
    ({ render, element, click, change, submit } = createContainer());
    jest.spyOn(window, 'fetch')
      .mockReturnValue(fetchResponseOk({}));
  });  

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('renders a form', () => {
    render(<PartDisplay />);
    expect(form('partDisplayForm')).not.toBeNull();
  });    

  it('renders a submit button', () => {
    render(<PartDisplay />);
    let submitButton = element('input[type="submit"');
    expect(submitButton).not.toBeNull();
  });

  it('calls fetch with the right properties when submitting data', async () => {
    render(
      <PartDisplay onSubmit={() => {}} />
    );
    submit(form('partDisplayForm'));
    expect(window.fetch).toHaveBeenCalledWith(
      '/parts',
      expect.objectContaining({
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
    }));
  });

  it('gives notification onSave when form is submitted', async () => {
    const partId = { id: '001' }
    //will be applied to window.fetch
    window.fetch.mockReturnValue(fetchResponseOk(partId));  
    const saveSpy = jest.fn();
    render(<PartDisplay onSave={saveSpy} />);
    await submit(form('partDisplayForm'));
    expect(saveSpy).toHaveBeenCalledWith(partId);
  });

  it('does not notify onSave if the POST request returns an error', async () => {
    window.fetch.mockReturnValue(fetchResponseError());
    const saveSpy = jest.fn();
    render(<PartDisplay onSave={saveSpy} />);
    submit(form('partDisplayForm'));
    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('prevents the default action when submitting the form', async () => {
    const preventDefaultSpy = jest.fn();
    render(<PartDisplay />);
    await submit(form('partDisplayForm'), {
        preventDefault: preventDefaultSpy
      });
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('renders error message when fetch call fails', async () => {
    window.fetch.mockReturnValue(Promise.resolve({ ok: false }));
    render(<PartDisplay />);
    await submit(form('partDisplayForm'));
    const errorElement = element('.error');
    expect(errorElement).not.toBeNull();
    expect(errorElement.textContent).toMatch('error occurred');
  });

  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };  

  const itRendersAsATextBox = fieldName => {
    it('renders as a text box', () => {
      render(<PartDisplay />);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });
  };
  
  const itIncludesExistingValue = fieldName => {    
    it('includes the existing value', () => {
      render(<PartDisplay part={part} />);
      expect(field(fieldName).value).toEqual(part[fieldName]);
    });  
  };

  const itRendersALabel = (fieldName, labelText) => {
    it('renders a label', () => {
      render(<PartDisplay />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(labelText
      );
    });  
  };

  const itAssignsIdMatchingLabelId = fieldName => {  
    it('assigns an id that matches the label id', () => {
      render(<PartDisplay />);
      expect(field(fieldName).id).toEqual(fieldName);
    });  
  };

  const itSavesExistingValue = (fieldName) => {  
    it('saves existing value when submitted', async () => {
      expect.hasAssertions();
      render(
        <PartDisplay
          part={part}
        />
      );
      submit(form('partDisplayForm'));
      expect(requestBodyOf(window.fetch)).toMatchObject(part);
    });
  };

  const itSavesNewValue = (fieldName, newValue) => {  
    it('saves new value when submitted', async () => {

      expect.hasAssertions();
      render(
        <PartDisplay        
          part={part}
        />
      );
      change(field(fieldName), {
        target: { value: newValue, name: fieldName }
      });
      submit(form('partDisplayForm'));
      expect(requestBodyOf(window.fetch)).toMatchObject({
        ...part, [fieldName]: 'newValue'
      });
    }); 
       
  };

  const describeField = (fieldName, fieldLabel) => {
    describe(`${fieldName} field`, () => {
      itRendersAsATextBox(fieldName);
      itIncludesExistingValue(fieldName);
      itRendersALabel(fieldName, fieldLabel);
      itAssignsIdMatchingLabelId(fieldName);
      itSavesExistingValue(fieldName, 'existingValue');
      itSavesNewValue(fieldName, 'newValue');
    });
  }  
    
  describeField('partNumber', 'Part Number');
  describeField('partName', 'Part Name');
  describeField('uom', 'UOM');
  describeField('category', 'Category');
  describeField('description', 'Description');   

});
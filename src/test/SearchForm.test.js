import React from 'react';
import { createContainer } from './domManipulators';
import { SearchForm } from '../components/SearchForm/SearchForm';

describe('SearchForm', () => {
  let render, element, elements, submit, change;

  const form = (id) => element(`form[id="${id}"]`);

  beforeEach(() => {
    ({ render, element, elements, submit, change } =
      createContainer());
  });

  it('renders the #searchForm element', () => {
    render(<SearchForm />);
    expect(element('form#searchForm')).not.toBeNull();
  });

  it('renders the keyword search input container element', () => {
    render(<SearchForm />);
    const keywordInputContainer = element(
      'div.search-form__keyword-container'
    );
    expect(keywordInputContainer).not.toBeNull();
  });

  it('renders the keyword search text input element', () => {
    render(<SearchForm />);
    const keywordTextInput = element(
      '.search-form__keyword-container > #keywordInput'
    );
    expect(keywordTextInput).not.toBeNull();
  });

  it('renders the keyword text input with the right attribures', () => {
    render(<SearchForm />);
    const keywordTextInput = element(
      '.search-form__keyword-container > #keywordInput'
    );
    expect(keywordTextInput.getAttribute('name')).toEqual(
      'searchText'
    );
    expect(keywordTextInput.getAttribute('placeholder')).toEqual(
      'Keyword(s)'
    );
    expect(keywordTextInput.getAttribute('maxLength')).toEqual(
      '200'
    );
    expect(keywordTextInput.getAttribute('size')).toEqual('60');
  });

  it('renders the submit search button with the right text', () => {
    render(<SearchForm />);
    const submitBtn = element(
      '.search-form__keyword-container > #submitSearch'
    );
    expect(submitBtn).not.toBeNull();
    expect(submitBtn.value).toEqual('Search');
  });

  it('renders the table select container element', () => {
    render(<SearchForm />);
    expect(element('#searchForm > #tableSelect')).not.toBeNull();
  });

  it('prevents default behavior on submission', async () => {
    const preventDefaultSpy = jest.fn();
    render(<SearchForm />);
    await submit(form('searchForm'), {
      preventDefault: preventDefaultSpy,
    });
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('checks off checkboxes when they are changed', () => {
    render(<SearchForm />);
    const checkboxes = elements('input[type="checkbox"');
    change(checkboxes[0]);
    expect(checkboxes[0].checked).toEqual(true);
  });

  it('unchecks checkboxes when they are changed while checked', () => {
    render(<SearchForm />);
    const checkboxes = elements('input[type="checkbox"');
    change(checkboxes[0]);
    expect(checkboxes[0].checked).toEqual(true);
    change(checkboxes[0]);
    expect(checkboxes[0].checked).toEqual(false);
  });
});

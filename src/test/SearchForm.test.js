import React from 'react';
import 'whatwg-fetch';
import { createContainer, withEvent } from './domManipulators';
import { SearchForm } from '../components/SearchForm/SearchForm';
import { fetchResponseOk, requestURLOf } from './spyHelpers';

describe.only('SearchForm', () => {
  let render, element, submit, inputsOfType, change;

  const form = (id) => element(`form[id="${id}"]`);
  const searchParam = (name, value) => `${name}=${value}`;
  const fieldWithName = (fieldName) =>
    searchParam('field', fieldName);
  const tableWithName = (tableName) =>
    searchParam('table', tableName);

  beforeEach(() => {
    ({ render, element, submit, inputsOfType, change } =
      createContainer());
    jest.spyOn(window, 'fetch').mockReturnValue(fetchResponseOk({}));
  });

  afterEach(() => {
    window.fetch.mockRestore();
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
    expect(keywordTextInput.getAttribute('maxLength')).toEqual('200');
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
    const checkboxes = inputsOfType('checkbox');
    change(checkboxes[0]);
    expect(checkboxes[0].checked).toEqual(true);
  });

  it('unchecks checkboxes when they are changed while checked', () => {
    render(<SearchForm />);
    const checkboxes = inputsOfType('checkbox');
    change(checkboxes[0]);
    expect(checkboxes[0].checked).toEqual(true);
    change(checkboxes[0]);
    expect(checkboxes[0].checked).toEqual(false);
  });

  it('includes a single field in the fetch request when field is checked', async () => {
    render(<SearchForm />);
    const checkboxes = inputsOfType('checkbox');
    change(checkboxes[0]);
    await submit(form('searchForm'));
    const fetchURL = requestURLOf(window.fetch);
    expect(fetchURL).toContain(fieldWithName(checkboxes[0].value));
  });

  it('includes a multiple fields in the fetch request when checked', async () => {
    render(<SearchForm />);
    const checkboxes = inputsOfType('checkbox');
    change(checkboxes[0]);
    change(checkboxes[1]);
    await submit(form('searchForm'));
    const fetchURL = requestURLOf(window.fetch);
    expect(fetchURL).toContain(fieldWithName(checkboxes[0].value));
    expect(fetchURL).toContain(fieldWithName(checkboxes[1].value));
  });

  it('includes the selected table in the fetch request', async () => {
    render(<SearchForm />);
    const radioBtns = inputsOfType('radio');
    change(radioBtns[0]);
    await submit(form('searchForm'));
    const fetchURL = requestURLOf(window.fetch);
    expect(fetchURL).toContain(tableWithName(radioBtns[0].value));
  });

  it('includes the keyword search text in the fetch request', async () => {
    const inputText = 'keywordtext123';
    render(<SearchForm />);
    change(
      element('#keywordInput'),
      withEvent('searchText', inputText)
    );
    await submit(form('searchForm'));
    const fetchURL = requestURLOf(window.fetch);
    expect(fetchURL).toContain(searchParam('searchText', inputText));
  });
});

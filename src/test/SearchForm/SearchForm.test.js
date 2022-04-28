import React from 'react';
import 'whatwg-fetch';
import { createContainer, withEvent } from '../domManipulators';
import { createShallowRenderer, type } from '../shallowHelpers';
import {
  AdvancedSearchToggle,
  SearchForm,
} from '../../components/SearchForm/SearchForm';
import { fetchResponseOk, requestURLOf } from '../spyHelpers';
import { TableSelectRadios } from '../../components/SearchForm/TableSelectRadios/TableSelectRadios';
import { BasicSearchCheckboxes } from '../../components/SearchForm/BasicSearchCheckboxes/BasicSearchCheckboxes';
import { AdvancedSearchInputs } from '../../components/SearchForm/AdvancedSearchInputs/AdvancedSearchInputs';
import {
  advancedFields,
  basicFields,
  tableSelectFields,
} from './testFieldData';

describe.only('SearchForm', () => {
  //full render variables
  let render,
    element,
    elements,
    submit,
    inputsOfType,
    change,
    click,
    field;

  //shallow render variables
  let shallowRender, elementMatching;

  const form = (id) => element(`form[id="${id}"]`);
  const searchParam = (name, value) => `${name}=${value}`;
  const fieldWithName = (fieldName) =>
    searchParam('field', fieldName);
  const tableWithName = (tableName) =>
    searchParam('table', tableName);

  const selectTable = (table) => {
    const event = {
      target: {
        value: table,
      },
    };
    elementMatching(type(TableSelectRadios)).props.handleTableChange(
      event
    );
  };

  const toggleAdvancedSearch = () =>
    elementMatching(
      type(AdvancedSearchToggle)
    ).props.handleAdvancedSearchToggle();

  beforeEach(() => {
    ({
      render,
      element,
      elements,
      submit,
      inputsOfType,
      change,
      click,
      field,
    } = createContainer());
    ({ shallowRender, elementMatching } = createShallowRenderer());
    jest.spyOn(window, 'fetch').mockReturnValue(fetchResponseOk({}));
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('renders the #searchForm div', () => {
    render(<SearchForm />);
    expect(element('form#searchForm')).not.toBeNull();
  });

  it('renders the keyword search text input', () => {
    render(<SearchForm />);
    expect(element('#keywordInput')).not.toBeNull();
  });

  it('renders the keyword text input with the right attributes', () => {
    render(<SearchForm />);
    const keywordTextInput = element('#keywordInput');
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
    const submitBtn = element('#submitSearch');
    expect(submitBtn).not.toBeNull();
    expect(submitBtn.value).toEqual('Search');
  });

  const itDisplaysComponent = (component) => {
    it(`displays the ${component} component`, () => {
      shallowRender(<SearchForm />);
      expect(elementMatching(type(component))).not.toBeNull();
    });
  };

  itDisplaysComponent(TableSelectRadios);
  itDisplaysComponent(BasicSearchCheckboxes);

  it('prevents default behavior on submission', async () => {
    const preventDefaultSpy = jest.fn();
    render(<SearchForm />);
    await submit(form('searchForm'), {
      preventDefault: preventDefaultSpy,
    });
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('it passes the right checkboxes to BasicSearchCheckboxes when the table is changed', () => {
    shallowRender(
      <SearchForm
        advancedSearchFields={advancedFields}
        tableSelectFields={tableSelectFields}
        basicSearchFields={basicFields}
        initialTable={tableSelectFields[0].value}
      />
    );

    expect(
      elementMatching(type(BasicSearchCheckboxes)).props.fieldData
    ).toBe(basicFields[tableSelectFields[0].value]);
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

  it('includes a single field in the fetch request when field a single is checked', async () => {
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

  it('renders the advanced search toggle element', () => {
    render(<SearchForm />);
    expect(element('#advancedSearchToggle')).not.toBeNull();
  });

  describe('AdvancedSearchToggle', () => {
    it('initially displays prompt to open advanced search', () => {
      render(<SearchForm />);
      expect(element('#advancedSearchToggle').textContent).toEqual(
        'Open Advanced Search'
      );
      const arrow = element('span i');
      expect(arrow.classList).toContain('down-arrow');
      expect(arrow.classList).toContain('btn-text__down-arrow');
    });

    it('changes the prompt to close advanced search on first click', () => {
      render(<SearchForm />);
      const advancedSearchToggle = element('#advancedSearchToggle');
      click(advancedSearchToggle);
      expect(advancedSearchToggle.textContent).toEqual(
        'Close Advanced Search'
      );
      const arrow = element('span i');
      expect(arrow.classList).toContain('up-arrow');
      expect(arrow.classList).toContain('btn-text__up-arrow');
    });

    it('changes the prompt back to open advanced search on second click', () => {
      render(<SearchForm />);
      const advancedSearchToggle = element('#advancedSearchToggle');
      click(advancedSearchToggle);
      click(advancedSearchToggle);
      expect(advancedSearchToggle.textContent).toEqual(
        'Open Advanced Search'
      );
      const arrow = element('span i');
      expect(arrow.classList).toContain('down-arrow');
      expect(arrow.classList).toContain('btn-text__down-arrow');
    });
  });

  it('does not initially display the AdvancedSearchInputs component', () => {
    shallowRender(<SearchForm />);
    expect(
      elementMatching(type(AdvancedSearchInputs))
    ).not.toBeDefined();
  });

  it('displays the AdvancedSearchInputs when advanced search is toggled on', () => {
    render(<SearchForm />);
    click(element('#advancedSearchToggle'));
    expect(element('#advancedSearchTextInputs')).not.toBeNull();
  });

  it('hides the BasicSearchCheckboxes component when advanced search is toggled on', () => {
    render(<SearchForm />);
    click(element('#advancedSearchToggle'));
    expect(element('#basicSearchCheckboxes')).toBeNull();
  });

  it('hides the AdvancedSearchInputs when advanced search is toggled back off', () => {
    render(<SearchForm />);
    click(element('#advancedSearchToggle'));
    click(element('#advancedSearchToggle'));
    expect(element('#advancedSearchTextInputs')).toBeNull();
  });

  it('shows the BasicSearchCheckboxes component when advanced search is toggled back off', () => {
    render(<SearchForm />);
    click(element('#advancedSearchToggle'));
    click(element('#advancedSearchToggle'));
    expect(element('#basicSearchCheckboxes')).not.toBeNull();
  });

  it('does not include basic search params in fetch request when advanced search is on', async () => {
    render(<SearchForm />);
    const checkboxes = inputsOfType('checkbox');
    change(checkboxes[0]);
    click(element('#advancedSearchToggle'));
    await submit(form('searchForm'));
    const fetchURL = requestURLOf(window.fetch);
    expect(fetchURL).not.toContain(
      fieldWithName(checkboxes[0].value)
    );
  });

  it('includes the advanced search field params in fetch request when advanced search is on', async () => {
    render(<SearchForm />);
    click(element('#advancedSearchToggle'));
    const advancedInputs = elements(
      '#advancedSearchTextInputs input'
    );
    await submit(form('searchForm'));
    const fetchURL = requestURLOf(window.fetch);
    expect(fetchURL).toContain(
      searchParam(advancedInputs[0].name, '')
    );
    expect(fetchURL).toContain(
      searchParam(advancedInputs[1].name, '')
    );
  });

  it('includes advanced search input text in fetch request', async () => {
    render(
      <SearchForm
        advancedSearchFields={advancedFields}
        initialTable={tableSelectFields[0].value}
      />
    );
    click(element('#advancedSearchToggle'));
    const advancedInputs = elements(
      '#advancedSearchTextInputs input'
    );
    change(
      field('searchForm', advancedInputs[0].name),
      withEvent(advancedInputs[0].name, 'inputvalue1')
    );
    change(
      field('searchForm', advancedInputs[1].name),
      withEvent(advancedInputs[1].name, 'inputvalue2')
    );
    await submit(form('searchForm'));
    const fetchURL = requestURLOf(window.fetch);
    expect(fetchURL).toContain(
      searchParam(advancedInputs[0].name, 'inputvalue1')
    );
    expect(fetchURL).toContain(
      searchParam(advancedInputs[1].name, 'inputvalue2')
    );
  });

  //CHANGING TABLES

  it('it passes the inital table prop to the table select component', () => {
    shallowRender(
      <SearchForm
        advancedSearchFields={advancedFields}
        tableSelectFields={tableSelectFields}
        initialTable={tableSelectFields[0].value}
      />
    );
    expect(elementMatching(type(TableSelectRadios))).toBeDefined();
    expect(
      elementMatching(type(TableSelectRadios)).props.selectedTable
    ).toBe(tableSelectFields[0].value);
  });

  it('passes the right props to the BasicSearchCheckox component when the table is changed', () => {
    shallowRender(
      <SearchForm
        basicSearchFields={basicFields}
        advancedSearchFields={advancedFields}
        tableSelectFields={tableSelectFields}
        initialTable={tableSelectFields[0].value}
      />
    );
    const otherTableName = tableSelectFields[1].value;
    selectTable(otherTableName);
    expect(
      elementMatching(type(BasicSearchCheckboxes)).props.fieldData
    ).toBe(basicFields[otherTableName]);
  });

  it('passes the right props to AdvancedSearchInput when table is changed', () => {
    shallowRender(
      <SearchForm
        basicSearchFields={basicFields}
        advancedSearchFields={advancedFields}
        tableSelectFields={tableSelectFields}
        initialTable={tableSelectFields[0].value}
      />
    );
    const otherTableName = tableSelectFields[1].value;
    toggleAdvancedSearch();
    selectTable(otherTableName);
    expect(
      elementMatching(type(AdvancedSearchInputs)).props.fieldData
    ).toBe(advancedFields[otherTableName]);
  });
});

import React from 'react';
import 'whatwg-fetch';
import { createContainer, withEvent } from '../domManipulators';
import { createShallowRenderer, type } from '../shallowHelpers';
import {
  AdvancedSearchToggle,
  SearchForm,
} from '../../components/SearchForm/SearchForm';
import { TableSelectRadios } from '../../components/SearchForm/TableSelectRadios/TableSelectRadios';
import { BasicSearchCheckboxes } from '../../components/SearchForm/BasicSearchCheckboxes/BasicSearchCheckboxes';
import { AdvancedSearchInputs } from '../../components/SearchForm/AdvancedSearchInputs/AdvancedSearchInputs';
import {
  advancedFields,
  basicFields,
  tableSelectFields,
} from './testFieldData';

describe('SearchForm', () => {
  //full render variables
  let render,
    element,
    elements,
    submit,
    inputsOfType,
    change,
    click,
    field,
    form;

  let searchSpy;

  //shallow render variables
  let shallowRender, elementMatching;

  const dataProps = {
    basicSearchFields: basicFields,
    advancedSearchFields: advancedFields,
    tableSelectFields: tableSelectFields,
    initialTable: tableSelectFields[0].value,
  };

  const searchRequestParam = (searchSpy) =>
    searchSpy.mock.calls[0][0];

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
      form,
    } = createContainer());
    ({ shallowRender, elementMatching } = createShallowRenderer());
    searchSpy = jest.fn();
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

  describe('searchParams', () => {
    it('is passed a single checkbox field when it is checked', async () => {
      render(
        <SearchForm
          basicSearchFields={basicFields}
          advancedSearchFields={advancedFields}
          tableSelectFields={tableSelectFields}
          initialTable={tableSelectFields[0].value}
          searchRequest={searchSpy}
        />
      );
      const checkboxes = inputsOfType('checkbox');
      change(checkboxes[0]);
      await submit(form('searchForm'));
      expect(
        searchRequestParam(searchSpy).basicSearchSelection
      ).toEqual([checkboxes[0].value]);
    });

    it('is passed multiple fields when multiple fields are checked', async () => {
      render(
        <SearchForm
          basicSearchFields={basicFields}
          advancedSearchFields={advancedFields}
          tableSelectFields={tableSelectFields}
          initialTable={tableSelectFields[0].value}
          searchRequest={searchSpy}
        />
      );
      const checkboxes = inputsOfType('checkbox');
      change(checkboxes[0]);
      change(checkboxes[1]);
      await submit(form('searchForm'));
      expect(
        searchRequestParam(searchSpy).basicSearchSelection
      ).toEqual([checkboxes[0].value, checkboxes[1].value]);
    });

    it('is passed the selected table', async () => {
      render(
        <SearchForm
          basicSearchFields={basicFields}
          advancedSearchFields={advancedFields}
          tableSelectFields={tableSelectFields}
          initialTable={tableSelectFields[0].value}
          searchRequest={searchSpy}
        />
      );
      const radioBtns = inputsOfType('radio');
      change(radioBtns[0]);
      await submit(form('searchForm'));
      expect(searchRequestParam(searchSpy).table).toEqual(
        radioBtns[0].value
      );
    });

    it('is passed keyword input search text', async () => {
      const searchText = 'keywordtext123';
      render(
        <SearchForm
          basicSearchFields={basicFields}
          advancedSearchFields={advancedFields}
          tableSelectFields={tableSelectFields}
          initialTable={tableSelectFields[0].value}
          searchRequest={searchSpy}
        />
      );
      change(
        element('#keywordInput'),
        withEvent('searchText', searchText)
      );
      await submit(form('searchForm'));
      expect(searchRequestParam(searchSpy).searchText).toEqual(
        searchText
      );
    });

    it('is passed advancedSearchOn: true when advanced search is toggled on', async () => {
      render(<SearchForm searchRequest={searchSpy} />);
      const checkboxes = inputsOfType('checkbox');
      change(checkboxes[0]);
      click(element('#advancedSearchToggle'));
      await submit(form('searchForm'));
      expect(searchRequestParam(searchSpy).advancedSearchOn).toEqual(
        true
      );
    });

    it('is passed advanced search input text', async () => {
      render(
        <SearchForm
          advancedSearchFields={advancedFields}
          initialTable={tableSelectFields[0].value}
          searchRequest={searchSpy}
        />
      );
      click(element('#advancedSearchToggle'));
      const advancedInputs = elements(
        '#advancedSearchTextInputs input'
      );
      const fieldChanged = advancedInputs[0].name;
      const inputValue = 'inputvalue';
      change(
        field('searchForm', fieldChanged),
        withEvent(fieldChanged, inputValue)
      );
      await submit(form('searchForm'));
      expect(
        searchRequestParam(searchSpy).advancedSearchInputs[
          fieldChanged
        ]
      ).toEqual(inputValue);
    });
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

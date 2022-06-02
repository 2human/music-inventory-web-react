import React from 'react';
import { PageButtons } from '../../components/SearchResults/PageButtons/PageButtons';
import { innerPageBtnValues } from '../../components/SearchResults/PageButtons/pageButtonsHelpers';
import { createContainer } from '../domManipulators';

describe('PageButtons', () => {
  let render, element, elements, click, inputsOfType;

  //get inner page buttons from querySelectorAll result
  //  that gets all page buttons
  const innerPageBtns = (pageBtns) =>
    pageBtns.slice(2, pageBtns.length - 2);

  beforeEach(() => {
    ({ render, element, elements, click, inputsOfType } =
      createContainer());
  });

  it('renders the page buttons div', () => {
    render(<PageButtons />);
    expect(element('div#pageBtns')).not.toBeNull();
  });

  it('renders the "previous" and "next" buttons first and last, respectively', () => {
    render(
      <PageButtons maxButtons={4} currentPage={1} totalPages={2} />
    );
    const buttons = inputsOfType('button');
    expect(buttons[0].value).toEqual('Previous');
    expect(buttons[buttons.length - 1].value).toEqual('Next');
  });

  it('renders first page button after "Previous", and last page button before "Next"', () => {
    render(
      <PageButtons maxButtons={4} currentPage={1} totalPages={2} />
    );
    const buttons = inputsOfType('button');
    expect(buttons[1].value).toEqual('1');
    expect(buttons[buttons.length - 2].value).toEqual('2');
  });

  it('renders the right page buttons', () => {
    render(
      <PageButtons maxButtons={4} currentPage={1} totalPages={4} />
    );
    const innerButtons = innerPageBtns(inputsOfType('button'));
    expect(innerButtons).toHaveLength(2);
  });

  it('returns the page number when numerical button clicked', () => {
    const btnClickSpy = jest.fn();
    render(
      <PageButtons
        handleButtonClick={btnClickSpy}
        maxButtons={4}
        currentPage={2}
        totalPages={4}
      />
    );
    const buttons = inputsOfType('button');
    const firstPageBtn = buttons[1];
    click(firstPageBtn);
    expect(btnClickSpy).toHaveBeenCalledWith(1);
  });

  it('returns the button string value when previous or next button clicked', () => {
    const btnClickSpy = jest.fn();
    render(
      <PageButtons
        handleButtonClick={btnClickSpy}
        maxButtons={4}
        currentPage={2}
        totalPages={4}
      />
    );
    const buttons = inputsOfType('button');
    const previousBtn = buttons[0];
    click(previousBtn);
    expect(btnClickSpy).toHaveBeenCalledWith('Previous');
  });

  it('disables the "Previous" page button when first page is selected', () => {
    render(
      <PageButtons maxButtons={4} currentPage={1} totalPages={4} />
    );
    const previousBtn = inputsOfType('button')[0];
    expect(previousBtn.disabled).toEqual(true);
  });

  it('disables the "Next" page button when last page is selected', () => {
    render(
      <PageButtons maxButtons={4} currentPage={4} totalPages={4} />
    );
    const buttons = inputsOfType('button');
    const nextPageBtn = buttons[buttons.length - 1];
    expect(nextPageBtn.disabled).toEqual(true);
  });

  it('disables the currentPage button when it is an inner page', () => {
    render(
      <PageButtons maxButtons={4} currentPage={2} totalPages={4} />
    );

    const currentPageBtn = inputsOfType('button')[2];
    expect(currentPageBtn.disabled).toEqual(true);
  });

  it('disables the currentPage button when it is an the first page', () => {
    render(
      <PageButtons maxButtons={4} currentPage={1} totalPages={4} />
    );

    const firstPageBtn = inputsOfType('button')[1];
    expect(firstPageBtn.disabled).toEqual(true);
  });

  it('disables the currentPage button when it is an the last page', () => {
    render(
      <PageButtons maxButtons={4} currentPage={4} totalPages={4} />
    );

    const buttons = inputsOfType('button');
    const lastPageBtn = buttons[buttons.length - 2];
    expect(lastPageBtn.disabled).toEqual(true);
  });
});

describe('pageButtonsHelpers', () => {
  it('includes all inner buttons when maxButtons is not exceeded', () => {
    let curPage = 1;
    let totalPages = 4;
    let maxInnerBtns = 2;
    let innerBtnValues = innerPageBtnValues(
      curPage,
      totalPages,
      maxInnerBtns
    );

    expect(innerBtnValues).toHaveLength(2);
    expect(innerBtnValues[0]).toEqual(2);
    expect(innerBtnValues[1]).toEqual(3);
  });
});

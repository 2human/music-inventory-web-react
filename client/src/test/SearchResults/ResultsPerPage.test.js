import React from 'react';
import { ResultsPerPage } from '../../components/SearchResults/ResultsPerPage/ResultsPerPage';
import { createContainer } from '../domManipulators';

describe('ResultsPerPage', () => {
  let render, element, elements, click;

  let options = [111, 999];

  beforeEach(() => {
    ({ render, element, elements, click } = createContainer());
  });

  it('renders a span element', () => {
    render(<ResultsPerPage />);
    expect(element('span')).not.toBeNull();
  });

  it('renders "Results Per Page:" within span element', () => {
    render(<ResultsPerPage />);
    expect(element('span').textContent).toContain(
      'Results Per Page:'
    );
  });

  it('renders a results per page option button for each option', () => {
    render(<ResultsPerPage options={options} />);
    expect(elements('input[type="button"]')).toHaveLength(
      options.length
    );
  });

  it('displays the respective option value within each option button', () => {
    render(<ResultsPerPage options={options} />);
    const optionBtns = elements('input[type="button"');
    expect(parseInt(optionBtns[0].value)).toEqual(options[0]);
    expect(parseInt(optionBtns[1].value)).toEqual(options[1]);
  });

  it('returns the option value when option is clicked', () => {
    const optionClickSpy = jest.fn();
    render(
      <ResultsPerPage
        options={options}
        handleOptionClick={optionClickSpy}
      />
    );

    const optionBtns = elements('input[type="button"');
    click(optionBtns[1]);

    expect(optionClickSpy).toHaveBeenCalledWith(options[1]);
  });

  it('disables the option that is selected', () => {
    render(<ResultsPerPage options={options} selected={999} />);
    const selectedOption = elements('input[type="button"]')[1];
    expect(selectedOption.disabled).toEqual(true);
  });
});

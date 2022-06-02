import React from 'react';

export const ResultsPerPage = ({
  options,
  handleOptionClick,
  selected,
}) => (
  <span className="results-per-page">
    Results Per Page:{' '}
    {options.map((option) => (
      <ResultsPerPageOption
        key={option}
        value={option}
        handleOptionClick={handleOptionClick}
        isSelected={option === selected}
      />
    ))}
  </span>
);

const ResultsPerPageOption = ({
  value,
  handleOptionClick,
  isSelected,
}) => (
  <input
    type="button"
    className={`results-per-page__option${
      isSelected ? '--disabled' : ''
    }`}
    value={value}
    onClick={() => handleOptionClick(parseInt(value))}
    disabled={isSelected}
  />
);

ResultsPerPage.defaultProps = {
  options: [],
  handleOptionClick: () => {},
  selected: 0,
};

import React from 'react';
import {
  isFirstPageGap,
  isLastPageGap,
} from '../../SearchForm/searchFormHelpers';
import { innerPageBtnValues } from './pageButtonsHelpers';

export const PageButtons = ({
  maxButtons,
  totalPages,
  currentPage,
  handleButtonClick,
}) => {
  const innerBtnValues = innerPageBtnValues(
    currentPage,
    totalPages,
    maxButtons - 2
  );

  //return nothing if only one page
  if (totalPages < 2) return <div />;

  return (
    <div id="pageBtns" className="page-select page-select__top">
      <PreviousPageButton
        disabled={currentPage === 1}
        handleButtonClick={handleButtonClick}
      />
      <FirstPageButton
        handleButtonClick={handleButtonClick}
        disabled={currentPage === 1}
      />
      {isFirstPageGap(innerBtnValues) && <PageGap />}
      {innerBtnValues.map((value) => (
        <PageButton
          handleButtonClick={handleButtonClick}
          key={value}
          value={value}
          disabled={value === currentPage}
        />
      ))}
      {isLastPageGap(innerBtnValues, totalPages) && <PageGap />}
      {totalPages > 1 && (
        <LastPageButton
          handleButtonClick={handleButtonClick}
          value={totalPages}
          disabled={currentPage === totalPages}
        />
      )}
      <NextPageButton
        handleButtonClick={handleButtonClick}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

const PreviousPageButton = ({ disabled, handleButtonClick }) => (
  <input
    type="button"
    value={'Previous'}
    onClick={() => handleButtonClick('Previous')}
    className="btn btn--blue btn__page-btn btn__increment-btn"
    disabled={disabled}
  />
);

const FirstPageButton = ({ handleButtonClick, disabled }) => (
  <PageButton
    handleButtonClick={handleButtonClick}
    disabled={disabled}
    value={1}
  />
);

const PageGap = () => <span>&nbsp;...&nbsp;&nbsp;&nbsp;</span>;

const PageButton = ({ value, handleButtonClick, disabled }) => (
  <input
    type="button"
    value={value}
    onClick={() => handleButtonClick(parseInt(value))}
    className="btn btn--blue btn__page-btn"
    disabled={disabled}
  />
);

const LastPageButton = ({ handleButtonClick, disabled, value }) => (
  <PageButton
    handleButtonClick={handleButtonClick}
    disabled={disabled}
    value={value}
  />
);
const NextPageButton = ({ handleButtonClick, disabled }) => (
  <input
    type="button"
    value="Next"
    onClick={() => handleButtonClick('Next')}
    className="btn btn--blue btn__page-btn btn__increment-btn"
    disabled={disabled}
  />
);

PageButtons.defaultProps = {
  handleButtonClick: () => {},
};

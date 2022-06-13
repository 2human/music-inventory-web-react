const getLowerBound = (curPage, totalPages) => {
  if (curPage === 1) {
    return 2;
  }
  if (curPage === totalPages) {
    return totalPages - 1;
  }
  return curPage;
};

export const innerPageBtnValues = (
  curPage,
  totalPages,
  maxInnerButtons
) => {
  if (totalPages <= 2) return [];
  //determines range of buttons to create when navigating search page results
  //
  //first and last page buttons always created, so the boundaries for buttons that can possibly be created here
  //are between the 2nd and 2nd to last pages
  //
  //increment equally in each direction to start, then allocate rest to whatever boundary remains
  //until max buttons reached
  let totalButtons = 1, //current tally of buttons that will be created; one is already created
    //lower and upper bounds start at current page, unless cur page is first or last
    lowerBound = getLowerBound(curPage, totalPages),
    upperBound = lowerBound; //and are incremented until their boundaries are reached
  while (
    totalButtons < maxInnerButtons &&
    (lowerBound > 2 || upperBound < totalPages - 1)
  ) {
    //both 2nd page button and 2nd to last have yet to be created
    if (lowerBound > 2 && totalButtons < maxInnerButtons) {
      //second page not added
      lowerBound--;
      totalButtons++;
    }
    if (
      upperBound < totalPages - 1 &&
      totalButtons < maxInnerButtons
    ) {
      //second to last page not added and all buttons not created
      upperBound++;
      totalButtons++;
    }
  }
  let innerBtnValues = [];
  for (let i = lowerBound; i <= upperBound; i++) {
    innerBtnValues.push(i);
  }
  return innerBtnValues;
};

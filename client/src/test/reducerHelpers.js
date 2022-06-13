export const itMaintainsExistingState = (reducer, action) => {
  it('maintains existing state', () => {
    const existing = { a: 123 };
    expect(reducer(existing, action)).toMatchObject(existing);
  });
};

export const itSetsStatus = (reducer, action, value) => {
  it(`sets status to ${value}`, () => {
    expect(reducer(undefined, action)).toMatchObject({
      status: value,
    });
  });
};

export const itSetsModalTypeTo = (reducer, action, modalType) => {
  it(`sets the modalType to "${modalType}"`, () => {
    expect(reducer(undefined, action)).toMatchObject({
      modalType,
    });
  });
};

export const itSetsDataTypeTo = (reducer, action, dataType) => {
  it(`sets the dataType to "${dataType}"`, () => {
    expect(reducer(undefined, action)).toMatchObject({
      dataType,
    });
  });
};

export const itSetsTheRowIdToGivenValue = (
  reducer,
  action,
  rowId
) => {
  it('sets the rowId to the given value', () => {
    expect(reducer(undefined, action)).toMatchObject({
      rowId,
    });
  });
};

export const itSetsModalOpenToTrue = (reducer, action) => {
  it('sets the modalOpen status to true', () => {
    expect(reducer(undefined, action)).toMatchObject({
      modalOpen: true,
    });
  });
};

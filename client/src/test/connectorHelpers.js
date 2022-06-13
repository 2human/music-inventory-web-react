export const itMapsStateToPropsWhenNoOwnProps = (
  mapStateToProps,
  property,
  value
) => {
  it(`maps the ${property} to props when there are no ownProps`, () => {
    expect(mapStateToProps).toMatchObject({
      [property]: value,
    });
  });
};

export const itMapsStateToProps = (
  mapStateToProps,
  property,
  value
) => {
  it(`maps the ${property} to props`, () => {
    expect(mapStateToProps).toMatchObject({
      [property]: value,
    });
  });
};

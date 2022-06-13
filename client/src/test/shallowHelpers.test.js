import React from 'react';
import {
  createShallowRenderer,
  childrenOf,
  type,
} from './shallowHelpers';

describe('childrenOf', () => {
  it('returns no children', () => {
    expect(childrenOf(<div />)).toEqual([]);
  });

  it('returns direct children', () => {
    expect(
      childrenOf(
        <div>
          <p>A</p>
          <p>B</p>
        </div>
      )
    ).toEqual([<p>A</p>, <p>B</p>]);
  });

  it('returns text as an array of one item', () => {
    expect(childrenOf(<div>text</div>)).toEqual(['text']);
  });

  it('returns no children for text', () => {
    expect(childrenOf('text')).toEqual([]);
  });

  it('returns array of children for elements with one child', () => {
    expect(
      childrenOf(
        <div>
          <p>A</p>
        </div>
      )
    ).toEqual([<p>A</p>]);
  });
});

const TestComponent = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
);

describe('child', () => {
  let shallowRender, child;

  beforeEach(() => {
    ({ shallowRender, child } = createShallowRenderer());
  });

  it('returns undefined if the child does not exist', () => {
    shallowRender(<TestComponent />);
    expect(child(0)).not.toBeDefined();
  });

  it('returns child of rendered element', () => {
    shallowRender(
      <TestComponent>
        <p>A</p>
        <p>B</p>
      </TestComponent>
    );
    expect(child(1)).toEqual(<p>B</p>);
  });
});

describe('elementsMatching', () => {
  let shallowRender, elementsMatching;

  beforeEach(() => {
    ({ shallowRender, elementsMatching } = createShallowRenderer());
  });

  it('finds multiple direct children', () => {
    shallowRender(
      <TestComponent>
        <p>A</p>
        <p>B</p>
      </TestComponent>
    );
    expect(elementsMatching(type('p'))).toEqual([<p>A</p>, <p>B</p>]);
  });

  it('finds indirect children', () => {
    shallowRender(
      <TestComponent>
        <div>
          <p>A</p>
        </div>
      </TestComponent>
    );
    expect(elementsMatching(type('p'))).toEqual([<p>A</p>]);
  });
});

describe('elementMatching', () => {
  let shallowRender, elementMatching;

  beforeEach(() => {
    ({ shallowRender, elementMatching } = createShallowRenderer());
  });

  it('finds first direct child', () => {
    shallowRender(
      <TestComponent>
        <p>A</p>
        <p>B</p>
      </TestComponent>
    );
    expect(elementMatching(type('p'))).toEqual(<p>A</p>);
  });
});

import React from 'react';
import { Provider } from 'react-redux';
import { storeSpy } from 'expect-redux';
import { configureStore } from '../store';
import { act } from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow';

export const id = (id) => (element) =>
  element.props && element.props.id === id;
export const type = (type) => (element) => element.type === type;
export const className = (className) => (element) =>
  element.props.className === className;

export const click = (element) => element.props.onClick();

export const childrenOf = (element) => {
  if (typeof element === 'string') {
    return [];
  }
  const {
    props: { children },
  } = element;
  if (!children) {
    return [];
  }
  if (typeof children === 'string') {
    return [children];
  }
  if (Array.isArray(children)) {
    return children;
  }
  return [children];
};

const elementsMatching = (element, matcherFn) => {
  if (matcherFn(element)) {
    return [element];
  }
  return childrenOf(element).reduce(
    (acc, child) => [...acc, ...elementsMatching(child, matcherFn)],
    []
  );
};

export const createShallowRenderer = () => {
  let renderer = new ShallowRenderer();

  return {
    shallowRender: (component) => renderer.render(component),
    elementMatching: (matcherFn) =>
      elementsMatching(renderer.getRenderOutput(), matcherFn)[0],
    elementsMatching: (matcherFn) =>
      elementsMatching(renderer.getRenderOutput(), matcherFn),
    child: (n) => childrenOf(renderer.getRenderOutput())[n],
  };
};

export const createShallowRendererWithStore = () => {
  const store = configureStore([storeSpy]);
  let renderer = new ShallowRenderer();
  return {
    elementWithStoreMatching: (matcherFn) =>
      elementsMatching(renderer.getRenderOutput(), matcherFn)[0],
    elementsWithStoreMatching: (matcherFn) =>
      elementsMatching(renderer.getRenderOutput(), matcherFn),
    child: (n) => childrenOf(renderer.getRenderOutput())[n],
    store,
    shallowRenderWithStore: (component) => {
      act(() => {
        renderer.render(
          <Provider store={store}>{component}</Provider>
        );
      });
    },
  };
};

import { modalReducer } from '../../store/reducers/modalReducer';

describe('modalReducer', () => {
  it('returns a default state for an undefined existing state', () => {
    expect(modalReducer(undefined, {})).toEqual({
      modal: undefined,
      modalOpen: false,
      dataType: undefined,
      dataId: undefined,
    });
  });
});

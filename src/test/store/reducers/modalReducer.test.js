import {
  closeModal,
  modalRequestFailed,
  modalRequestSubmitting,
  modalRequestSuccessful,
  openCreateRow,
  openEditRow,
  openViewRow,
} from '../../../store/actions';
import { modalReducer } from '../../../store/reducers/modalReducer';
import {
  itMaintainsExistingState,
  itSetsModalOpenToTrue,
  itSetsModalTypeTo,
  itSetsStatus,
  itSetsTheRowIdToGivenValue,
} from '../../reducerHelpers';

describe('modalReducer', () => {
  const rowId = 999;

  it('returns a default state for an undefined existing state', () => {
    expect(modalReducer(undefined, {})).toEqual({
      modalOpen: false,
      modalType: undefined,
      dataType: undefined,
      rowId: undefined,
      columnName: undefined,
      status: undefined,
    });
  });

  describe('openEditRow', () => {
    itMaintainsExistingState(modalReducer, openEditRow());
    itSetsModalOpenToTrue(modalReducer, openEditRow());
    itSetsModalTypeTo(modalReducer, openEditRow(), 'edit');
    itSetsTheRowIdToGivenValue(
      modalReducer,
      openEditRow(rowId),
      rowId
    );

    it('sets the columnName to the given value', () => {
      const columnName = 'colname';
      expect(
        modalReducer(undefined, openEditRow(999, columnName))
      ).toMatchObject({
        columnName,
      });
    });
  });

  describe('openCreateRow', () => {
    itMaintainsExistingState(modalReducer, openCreateRow());
    itSetsModalOpenToTrue(modalReducer, openCreateRow());
    itSetsModalTypeTo(modalReducer, openCreateRow(), 'create');
    itSetsModalOpenToTrue(modalReducer, openCreateRow());

    it('sets the dataType to the given value', () => {
      const dataType = 'dataType';
      expect(
        modalReducer(undefined, openCreateRow(dataType))
      ).toMatchObject({
        dataType,
      });
    });
  });

  describe('openViewRow', () => {
    itMaintainsExistingState(modalReducer, openViewRow());
    itSetsModalTypeTo(modalReducer, openViewRow(), 'view');
    itSetsModalOpenToTrue(modalReducer, openViewRow());
    itSetsTheRowIdToGivenValue(
      modalReducer,
      openViewRow(rowId),
      rowId
    );
  });

  describe('modalRequestSubmitting', () => {
    itMaintainsExistingState(modalReducer, modalRequestSubmitting());

    itSetsStatus(
      modalReducer,
      modalRequestSubmitting(),
      'SUBMITTING'
    );
  });

  describe('modalRequestFailed', () => {
    itMaintainsExistingState(modalReducer, modalRequestFailed());

    itSetsStatus(modalReducer, modalRequestFailed(), 'FAILED');
  });

  describe('modalRequestSuccessful', () => {
    itMaintainsExistingState(modalReducer, modalRequestSuccessful());

    itSetsStatus(
      modalReducer,
      modalRequestSuccessful(),
      'SUCCESSFUL'
    );
  });

  describe('closeModal', () => {
    itMaintainsExistingState(modalReducer, modalRequestSuccessful());

    it('sets modalOpen to false', () => {
      expect(
        modalReducer({ modalOpen: 'true' }, closeModal())
      ).toMatchObject({
        modalOpen: false,
      });
    });
  });
});

import { formFields } from '../../../components/SingleRowForm/formData';
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
import { dataType as dataTypeFrom } from '../../../store/sagas/sagaHelpers';
import {
  itMaintainsExistingState,
  itSetsDataTypeTo,
  itSetsModalOpenToTrue,
  itSetsModalTypeTo,
  itSetsStatus,
  itSetsTheRowIdToGivenValue,
} from '../../reducerHelpers';

describe('modalReducer', () => {
  const rowData = { id: 999, val: 'val', callNumber: 'callnum' };

  it('returns a default state for an undefined existing state', () => {
    expect(modalReducer(undefined, {})).toEqual({
      modalOpen: false,
      modalType: undefined,
      dataType: undefined,
      rowId: undefined,
      columnName: undefined,
      status: undefined,
      fields: formFields,
    });
  });

  describe('openEditRow', () => {
    itMaintainsExistingState(modalReducer, openEditRow(rowData));
    itSetsModalOpenToTrue(modalReducer, openEditRow(rowData));
    itSetsModalTypeTo(modalReducer, openEditRow(rowData), 'edit');
    itSetsDataTypeTo(
      modalReducer,
      openEditRow(rowData),
      dataTypeFrom(rowData)
    );
    itSetsTheRowIdToGivenValue(
      modalReducer,
      openEditRow(rowData),
      rowData.id
    );

    it('sets the columnName to the given value', () => {
      const columnName = 'colname';
      expect(
        modalReducer(undefined, openEditRow(rowData, columnName))
      ).toMatchObject({
        columnName,
      });
    });
  });

  describe('openCreateRow', () => {
    const dataType = 'dataType';

    itMaintainsExistingState(modalReducer, openCreateRow());
    itSetsModalOpenToTrue(modalReducer, openCreateRow());
    itSetsModalTypeTo(modalReducer, openCreateRow(), 'create');
    itSetsModalOpenToTrue(modalReducer, openCreateRow());

    it('sets the dataType to the given value', () => {
      expect(
        modalReducer(undefined, openCreateRow(dataType))
      ).toMatchObject({
        dataType,
      });
    });

    it('sets the rowId to undefined', () => {
      expect(
        modalReducer({ rowId: 999 }, openCreateRow(dataType))
      ).toMatchObject({
        rowId: undefined,
      });
    });

    it('sets the columnName to undefined', () => {
      expect(
        modalReducer(
          { columnName: 'column' },
          openCreateRow(dataType)
        )
      ).toMatchObject({
        columnName: undefined,
      });
    });
  });

  describe('openViewRow', () => {
    itMaintainsExistingState(modalReducer, openViewRow(rowData));
    itSetsModalTypeTo(modalReducer, openViewRow(rowData), 'view');
    itSetsModalOpenToTrue(modalReducer, openViewRow(rowData));
    itSetsTheRowIdToGivenValue(
      modalReducer,
      openViewRow(rowData),
      rowData.id
    );

    it('sets the dataType to the given value', () => {
      expect(
        modalReducer(undefined, openViewRow(rowData))
      ).toMatchObject({
        dataType: dataTypeFrom(rowData),
      });
    });
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

    it('sets status to undefined', () => {
      expect(
        modalReducer({ status: 'SUCCESSFUL' }, closeModal())
      ).toMatchObject({
        status: undefined,
      });
    });
  });
});

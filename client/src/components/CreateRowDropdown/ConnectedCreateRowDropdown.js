import { connect } from 'react-redux';
import { openCreateRow } from '../../store/actions';
import { Dropdown } from '../Dropdown/Dropdown';
import { linkProps } from './dropdownHelpers';

export const mapStateToProps = () => ({
  parentLink: 'Create',
  links: linkProps,
});

export const mapDispatchToProps = {
  linkClickCallback: openCreateRow,
};

export const ConnectedCreateRowDropdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dropdown);

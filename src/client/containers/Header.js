import { connect } from 'react-redux';

import Header from 'components/Header';
import {
  getUser,
  getIsAuthenticated,
  actionCreators,
} from 'modules/user';

const mapStateToProps = state => ({
  user: getUser(state),
  authenticated: getIsAuthenticated(state),
});

export default connect(
  mapStateToProps,
  { onSignOutClick: actionCreators.signOut },
)(Header);

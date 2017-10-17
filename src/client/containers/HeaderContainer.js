import { connect } from 'react-redux';

import Header from 'components/Header';
import { getUser } from 'modules/user';

const mapStateToProps = (state) => ({
  user: getUser(state),
});

export default connect(mapStateToProps)(Header);

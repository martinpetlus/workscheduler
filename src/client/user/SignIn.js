import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signIn } from './userActions';

export class SignIn extends Component {
  constructor() {
    super();
    this.signIn = () => this.props.signIn({});
  }

  render() {
    return (
      <div>
        <button onClick={this.signIn}>Sign in</button>
      </div>
    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signIn }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignIn);

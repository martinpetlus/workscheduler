import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter, Redirect } from 'react-router-dom';

import withWindowTitle from 'components/withWindowTitle';
import { SignInForm } from 'modules/user';

class SignInPage extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        from: PropTypes.shape({
          pathname: PropTypes.string.isRequired,
        }).isRequired,
      }),
    }).isRequired,
  };

  state = {
    redirectToReferrer: false,
  };

  handleSubmitSuccess = () => {
    this.setState({ redirectToReferrer: true });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <h2>Sign in</h2>
        <hr />
        <SignInForm onSubmitSuccess={this.handleSubmitSuccess} />
      </div>
    );
  }
}

export default compose(
  withRouter,
  withWindowTitle('Sign In'),
)(SignInPage);

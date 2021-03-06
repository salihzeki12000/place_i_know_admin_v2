import React from 'react';
import { connect } from 'react-redux';
import { signIn, startSignOut } from './../../actions/auth';
import SignInForm from './SignInForm';

export class SignInPage extends React.Component {
  onSubmit = data => {
    this.props.signIn(data);
  };

  render() {
    return (
      <div className="box-layout signin-page">
        <div className="box-layout__box">
          <img
            className="box-layout__header-image"
            src="images/logo_white.png"
            alt="Place I Know"
          />
          <h1 className="box-layout__title">Administration</h1>
          <SignInForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: data => dispatch(signIn(data)),
  };
};

export default connect(undefined, mapDispatchToProps)(SignInPage);

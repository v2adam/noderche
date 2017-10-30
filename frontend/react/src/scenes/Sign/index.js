import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PageNotFound from '../PageNotFound'
import Login from './scenes/Login';
import Register from './scenes/Register';
import registerUser from '../../services/sign/Register/actions';
import { loginUser } from '../../services/sign/Login/actions';

class Sign extends Component {

  render() {
    return (
      <div>
        {(() => {
          switch (this.props.location.pathname) {
            case '/login':
              return <Login handleSubmit={this.props.loginUser}/>;
            case '/register':
              return <Register handleSubmit={this.props.registerUser}/>;
            default:
              return <PageNotFound/>;
          }
        })()}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.currentUser.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ registerUser: registerUser, loginUser: loginUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sign);

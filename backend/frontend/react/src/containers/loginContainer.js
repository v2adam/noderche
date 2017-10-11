import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

import { loginUser } from '../actions/authActions';
import Login from '../components/login';

// ez egy smart component (container), mert összeköttetésben áll a store-ral, és így ismeri a belső állapotot
class LoginContainer extends Component {

  render() {

    if (this.props.isAuthenticated) {
      return (<h3>User already logged in</h3>);
    }

    return (
      <div className='container'>
        <Login onSubmit={this.props.loginUser}/>
        <h5>New user? <NavLink to='/register'>Register here!</NavLink></h5>
      </div>
    );
  }

}


// ezzel lehet rákapcsolódni a store-ra, és kinyerni belőle az állapotokat
function mapStateToProps(state) {
  return {
    isAuthenticated: state.currentUser.isAuthenticated,
  };
}


// ezzel érem el az action-öket
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser: loginUser }, dispatch);
}


// ezzel a kiajánlással egy store-ral összekötött komponensem lesz (smart componenet) => container !!!!
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);


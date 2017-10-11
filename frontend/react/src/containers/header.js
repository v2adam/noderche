import React from 'react';
import NavBar from "../components/navBar";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingBar from 'react-redux-loading-bar';
import { push } from 'react-router-redux';

import { logoutUser } from '../actions/authActions';
import store from '../store';

class Header extends React.Component {

  render() {

    let loginLogoutBtn = null;

    if (this.props.isAuthenticated) {
      loginLogoutBtn =
        <button className='btn btn-danger' onClick={() => this.props.logoutUser()}>Logout</button>;
    } else {
      loginLogoutBtn =
        <button className='btn btn-info' onClick={() => store.dispatch(push('/login'))}>
          Login</button>
      ;
    }


    return (
      <header>
        <h4>{this.props.loadingBar}</h4>
        <h4>Current user: {this.props.currentUser.username}</h4>
        {loginLogoutBtn}
        <LoadingBar showFastActions/>
        <NavBar isAuthenticated = {this.props.isAuthenticated}/>
      </header>
    )
  }
}


// ezzel lehet rákapcsolódni a store-ra, és kinyerni belőle az állapotokat
function mapStateToProps(state) {
  return {
    loadingBar: state.loadingBar,
    currentUser: state.currentUser.user,
    isAuthenticated: state.currentUser.isAuthenticated,
  };
}


// ezzel érem el az action-öket
function mapDispatchToProps(dispatch) {
  return bindActionCreators({logoutUser: logoutUser}, dispatch);
}

// ezzel a kiajánlással egy store-ral összekötött komponensem lesz (smart componenet) => container !!!!
export default connect(mapStateToProps, mapDispatchToProps)(Header);

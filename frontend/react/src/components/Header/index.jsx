import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingBar from 'react-redux-loading-bar';
import PropTypes from 'prop-types';
import NavBar from '../NavBar';
import { logoutUser } from '../../services/sign/Login/actions';
import store from '../../store';

class Header extends React.Component {
  render() {
    return (
      [
        <LoadingBar key="loadingBarKey" showFastActions />,
        <h4 key="key2">Current user: {this.props.currentUser.username}</h4>,
        <button
          key="logoutKey"
          className="btn btn-danger"
          onClick={() => this.props.logoutUser()}
        >Logout
        </button>,
        <button
          key="loginKey"
          className="btn btn-info"
          onClick={() => store.dispatch(push('/login'))}
        >Login
        </button>,
        <NavBar key="navBarKey" isAuthenticated={this.props.isAuthenticated} />
      ]
    );
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
  return bindActionCreators({ logoutUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);


Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  logoutUser: PropTypes.func.isRequired,
};

Header.defaultProps = {
  isAuthenticated: false,
};

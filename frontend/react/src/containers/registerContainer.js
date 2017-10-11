import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

import { registerUser } from '../actions/authActions';
import Register from "../components/register";

class RegisterContainer extends Component {

  // api-ra ráhív
  // user bejelentkezése

  constructor() {
    super();


    this.state = {
      invalidPasswords: false
    };

    this.invalidPasswords = this.invalidPasswords.bind(this);
  }



  invalidPasswords(data) {
    this.setState({ invalidPasswords: data })
  }


  render() {

    // így lehet a render-ben if-ezni
    // ha nem egyeznek a jelszavak, akkor jelezzen
    let errorMsg = null;

    if (this.state.invalidPasswords) {
      errorMsg = <div className="alert alert-warning">
        <strong>Warning!</strong> Passwords are not the same!
      </div>
    }

    return (
      <div className='container'>
        {errorMsg}
        <div>
          <Register onSubmit={this.props.registerUser} invalidPasswords={this.invalidPasswords}/>
          <h5>Already registered? <NavLink to='/login'>Login here!</NavLink></h5>
        </div>
      </div>
    );


  }
}


// ezzel lehet rákapcsolódni a store-ra, és kinyerni belőle az állapotokat
function mapStateToProps(state) {
  return {};
}


// ezzel érem el az action-öket
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ registerUser: registerUser }, dispatch);
}


// ezzel a kiajánlással egy store-ral összekötött komponensem lesz (smart componenet) => container !!!!
export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);


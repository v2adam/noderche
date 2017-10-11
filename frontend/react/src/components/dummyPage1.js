import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUsersWeb, removeUser } from "../actions/dummyDataSetActions";
import { bindActionCreators } from 'redux';

class DummyPage1 extends Component {

  componentWillMount() {
    console.log('DUMMY1-componentWillMount');
    // webről tölti le az adatokat
    this.props.fetchUsers();
  }


  componentDidMount() {
    console.log('DUMMY1-componentDidMount');
  }


  render() {
    console.log('DUMMY1-render');

    if (this.props.loadingBar) {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      )
    }

    return (
      <div className='container'>
        <ul>{this.props.users.map(user =>
          <li key={user.id}><b>Név:</b> {user.name}<br/>
            <b>Email:</b> {user.email}
            <button className='btn btn-danger' onClick={() => this.props.removeUser(user)}>Törlés
            </button>
          </li>)}</ul>
      </div>
    )

  }
}


// ezzel lehet rákapcsolódni a store-ra, és kinyerni belőle az állapotokat
function mapStateToProps(state) {
  return {
    users: state.users.users,
    loadingBar: state.loadingBar
  };
}


// ezzel érem el az action-öket
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUsers: fetchUsersWeb,
    removeUser: removeUser
  }, dispatch);
}

// ezzel a kiajánlással egy store-ral összekötött komponensem lesz (smart componenet) => container !!!!
export default connect(mapStateToProps, mapDispatchToProps)(DummyPage1);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSecretUsers } from '../actions/dummyDataSetActions';

import { SuperSecretUsers } from '../components/superSecretUsers';

class SecretContainer extends Component {


  componentWillMount() {
    this.props.fetchSecretUsers();
  }

  render() {
    return (
      <div className='container'>
        <SuperSecretUsers secretUsers={this.props.secretUsers}/>
        <h1>Ez itt nagyon titkos</h1>
      </div>
    );
  }
}


// ezzel lehet rákapcsolódni a store-ra, és kinyerni belőle az állapotokat
function mapStateToProps(state) {
  return { secretUsers: state.users.secretUsers };
}


// ezzel érem el az action-öket
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSecretUsers: fetchSecretUsers }, dispatch);
}

// ezzel a kiajánlással egy store-ral összekötött komponensem lesz (smart componenet) => container !!!!
export default connect(mapStateToProps, mapDispatchToProps)(SecretContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuExampleTabularOnLeft from './insideNav';
import 'semantic-ui-css/semantic.min.css';

class FirstExampleMain extends Component {

  constructor() {
    super();


    this.state = {};

  }


  render() {
    return (
      <div>
        <h1>Up</h1>
        <MenuExampleTabularOnLeft/>
        <h1>Down</h1>
      </div>
    );
  }
}

// itt lehetne a store-ból objektumokat meghivatkozni és használni
function mapStateToProps(state) {
  return {};
}

// itt lehetne actionöket behúzni, és 'bekapcsolni a keringésbe' (read more: dispatch )
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstExampleMain);

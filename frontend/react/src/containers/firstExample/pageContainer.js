import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuExampleTabularOnLeft from './menuComponent/menuExampleTabularOnLeftContainer';
import 'semantic-ui-css/semantic.min.css';

// ez a container foglalja össze az egész oldalt
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

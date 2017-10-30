import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css'
import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
// a navigációs sáv az állapotmentes

export default class NavBar extends Component {

  render() {

    let secretMenu = null;

    if (this.props.isAuthenticated) {

      secretMenu = <li><NavLink activeClassName='active' to='/secret'>Secret</NavLink></li>;

    }


    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <a className='navbar-brand' href='/'>WebSiteName</a>
          </div>
          <ul className='nav navbar-nav'>
            <li><NavLink exact activeClassName='active' to='/'>Home</NavLink></li>
            <li><NavLink activeClassName='active' to='/login'>Login</NavLink></li>
            <li><NavLink activeClassName='active' to='/dummy1'>Dummy1</NavLink></li>
            <li><NavLink activeClassName='active' to='/dummy2'>Dummy2</NavLink></li>
            <li><NavLink activeClassName='active' to='/chartdemo'>Chart Demo</NavLink></li>
            <li><NavLink activeClassName='active' to='/about'>About</NavLink></li>
            <li><NavLink activeClassName='active' to='/filterDemo'>FilterAbleTable</NavLink></li>
            {secretMenu}
            <li><NavLink activeClassName='active' to='/mapdemo'>Map Demo</NavLink></li>
            <li><NavLink activeClassName='active' to='/dashboard'>Dashboard</NavLink></li>
          </ul>FilterableDemoContainer
        </div>
      </nav>
    );
  }
}



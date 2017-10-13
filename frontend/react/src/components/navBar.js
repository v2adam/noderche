import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css'

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
            {secretMenu}
            <li><NavLink activeClassName='active' to='/mapdemo'>Map Demo</NavLink></li>
          </ul>
        </div>
      </nav>
    );
  }
}



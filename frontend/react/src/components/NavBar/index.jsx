import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css'

export default class NavBar extends Component {

  render() {

    let secretMenu = null;

    if (this.props.isAuthenticated) {
      secretMenu =
        <li><NavLink activeClassName='active' to='/first_example'>First Complex Example</NavLink>
        </li>;
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
            <li><NavLink activeClassName='active' to='/many_example'>Many Sandbox</NavLink></li>
            <li><NavLink activeClassName='active' to='/chart_sandbox'>Chart Sandbox</NavLink></li>
            <li><NavLink activeClassName='active' to='/async_example'>Async example</NavLink></li>
            {secretMenu}
            <li><NavLink activeClassName='active' to='/dashboard_editor'>Dashboard Editor</NavLink></li>
          </ul>
        </div>
      </nav>
    );
  }
}

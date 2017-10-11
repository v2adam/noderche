import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

// ez az about page
export default class Home extends Component {


  render() {
    return (
      <div>
        <h3>Ez a homepage</h3>
        <Link className='button' to='/about'>Ez egy Link</Link>
        <NavLink to='/about'>Ez egy NavLink</NavLink>
      </div>
    );

  }
}

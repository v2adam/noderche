import React, { Component } from 'react';

// user bejelentkeztetése
// ez egy dumb componens, értékeket a smart componenttől(container) kap, és neki adja vissz az adatokat



// lehet, hogy ki lehet dobni az extends-t és state helyett props-okkal, hogy igazi dumb component legyen

// van belső állapota, az input miatt, így lehet, hogy kell mégis?

export default class Login extends Component {

  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    };

    // bind-olni kell, hogy használhatóak legyenek a metódusok a JSX-ben
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // ha beír valami az input-ba, akkor látszódjon
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  // ha beír valami az input-ba, akkor látszódjon
  handleUserNameChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  // ráhív egy action-re, amit a parenttől kapott meg
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form name="register_form" className="container" onSubmit={this.handleSubmit}>
        <div id="register_form">
          <div className="form-group">
            <label className="col-sm-2 control-label required" htmlFor="register_form_username">Username:</label>
            <div className="col-sm-10">
              <input type="text"
                     id="register_form_username"
                     required="required"
                     placeholder="Enter your username"
                     value={this.state.username}
                     onChange={this.handleUserNameChange}
                     className="form-control"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label required"
                   htmlFor="register_form_body">Password:</label>
            <div className="col-sm-10">
              <input type="password"
                     id="register_form_password"
                     required="required"
                     placeholder="Enter your password"
                     value={this.state.password}
                     onChange={this.handlePasswordChange}
                     className="form-control"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-2"></div>
            <div className="col-sm-10">
              <button type="submit"
                      id="register_form_submit"
                      className="btn-default btn">
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    );

  }
}

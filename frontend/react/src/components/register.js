import React, { Component } from 'react';


export default class Register extends Component {

  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      passwordAgain: ''
    };

    // bind-olni kell, hogy használhatóak legyenek a metódusok a JSX-ben
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordAgainChange = this.handlePasswordAgainChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // ha beír valami az input-ba, akkor látszódjon
  handlePasswordChange(e) {
    this.props.invalidPasswords(false);
    this.setState({
      password: e.target.value
    });
  }

  handlePasswordAgainChange(e) {
    this.props.invalidPasswords(false);
    this.setState({
      passwordAgain: e.target.value
    });
  }

  // ha beír valami az input-ba, akkor látszódjon
  handleUserNameChange(e) {
    this.props.invalidPasswords(false);
    this.setState({
      username: e.target.value
    });
  }

  // ráhív egy action-re, amit a parenttől kapott meg
  handleSubmit(e) {
    e.preventDefault();

    if (this.state.password !== this.state.passwordAgain) {
      // jelzem a parent-nek, hogy a jelszavak nem egyeznek
      this.props.invalidPasswords(true);
      this.setState(...this.state, { password: '' });
      this.setState(...this.state, { passwordAgain: '' });
    } else {
      this.props.invalidPasswords(false);
      this.props.onSubmit({ username: this.state.username, password: this.state.password });
    }
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
            <label className="col-sm-2 control-label required"
                   htmlFor="register_form_body">Password again:</label>
            <div className="col-sm-10">
              <input type="password"
                     id="register_form_password_again"
                     required="required"
                     placeholder="Enter your password again"
                     value={this.state.passwordAgain}
                     onChange={this.handlePasswordAgainChange}
                     className="form-control"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-2"></div>
            <div className="col-sm-10">
              <button type="submit"
                      id="register_form_submit"
                      className="btn-default btn">
                Register
              </button>
            </div>
          </div>
        </div>
      </form>
    );

  }
}

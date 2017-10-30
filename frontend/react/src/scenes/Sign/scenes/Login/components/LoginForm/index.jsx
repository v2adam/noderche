import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import FormField from '../../../../components/FormFields';
import { NavLink } from 'react-router-dom';


class LoginForm extends Component {

  state = {
    username: '',
    password: ''
  };

  // input text change
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  // form submit
  handleSubmit = () => {
    const { username, password } = this.state;
    this.props.handleSubmit({ username: username, password: password });
  };


  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormField isRequired label='Username'
                   placeholder='Enter your username'
                   fieldType='text'
                   name='username'
                   value={this.state.username}
                   handleChange={this.handleChange}/>
        <FormField isRequired label='Password'
                   placeholder='Enter your password'
                   fieldType='password'
                   name='password'
                   value={this.state.password}
                   handleChange={this.handleChange}/>
        <Button type='submit'>Login</Button>
        <h5>New user? <NavLink to='/register'>Register here!</NavLink></h5>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default LoginForm;

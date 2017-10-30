import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { NavLink } from "react-router-dom";
import FormField from '../../../../components/FormFields';
import ValidationMessages from "../../../../components/ValidationMessages/index";


class RegisterForm extends Component {

  state = {
    username: '',
    password: '',
    password2: '',
    terms: false,
    errParams: {}
  };

  // input text change
  handleChange = (e) => {
    this.setState({ errParams: {} });
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  acceptTerms = () => {
    this.setState({ terms: !this.state.terms, errParams: {} });
  };


  checkPasswords = (pass1, pass2) => {
    return pass1 === pass2
  };


  // form submit
  handleSubmit = async () => {
    const { username, password, password2, terms } = this.state;

    if (terms) {
      if (this.checkPasswords(password, password2)) {
        this.setState({ errParams: {} });
        this.props.handleSubmit({ username: username, password: password });
      } else {
        await this.setState({
          errParams: {
            error: true,
            header: 'Error message',
            content: 'Invalid passwords'
          }
        });
      }
    } else {
      await this.setState({
        errParams: {
          error: true,
          header: 'Error message',
          content: 'Accept Terms'
        }
      });
    }
  };


  render() {

    let errMsg = !_.isEmpty(this.state.errParams) ?
      <ValidationMessages {...this.state.errParams} /> : null;

    return (
      <div>
        {errMsg}
        <Form onSubmit={this.handleSubmit}>
          <FormField isRequired
                     label='Username'
                     placeholder='Enter your username'
                     fieldType='text'
                     name='username'
                     value={this.state.username}
                     handleChange={this.handleChange}/>
          <FormField isRequired
                     label='Password'
                     placeholder='Enter your password'
                     fieldType='password'
                     name='password'
                     value={this.state.password}
                     handleChange={this.handleChange}/>
          <FormField isRequired
                     label='Password again'
                     placeholder='Enter your password again'
                     fieldType='password'
                     name='password2'
                     value={this.state.password2}
                     handleChange={this.handleChange}/>

          <Form.Field required>
            <Checkbox label='I agree to the Terms and Conditions'
                      checked={this.state.terms}
                      onChange={this.acceptTerms}/>
          </Form.Field>
          <Button type='submit'>Register</Button>
          <h5>Already registered? <NavLink to='/login'>Login here!</NavLink></h5>
        </Form>
      </div>
    )
  }
}


RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default RegisterForm;

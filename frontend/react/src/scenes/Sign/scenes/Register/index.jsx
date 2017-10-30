import React from 'react';
import RegisterForm from '../Register/components/RegisterForm';

const Register = (props) => (
  <div>
    <RegisterForm handleSubmit={props.handleSubmit}/>
  </div>

);

export default Register;

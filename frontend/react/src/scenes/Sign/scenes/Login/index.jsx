import React from 'react';
import LoginForm from '../Login/components/LoginForm';

const Login = (props) => (

  <div>
    <LoginForm handleSubmit={props.handleSubmit}/>
  </div>
);

export default Login;

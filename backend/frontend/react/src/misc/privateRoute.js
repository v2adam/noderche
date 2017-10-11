import React, { Component } from 'react';
import { Redirect, Route } from 'react-router';

// ez egy kis trükk, hogy hogyan csinálj privát route-okat
// csak a bejelentkezett userek láthatják az így létrehozott oldalt
const PrivateRoute = ({ Component, isAuthenticated, path, ...rest }) => (

  isAuthenticated ? <Route path={path} component={Component} {...rest}/> : <Redirect to={{ pathname: '/login' }}/>

);

export default PrivateRoute;
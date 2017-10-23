import React from 'react';
import MenuExampleTabularOnLeft from './menuComponent/menuExampleTabularOnLeftContainer';
import 'semantic-ui-css/semantic.min.css';

// ez csak arra van, hogy összefogja az oldalt
// a logika bent történik
const FirstExampleMain = (props) => (
  <div>
    <h1>Up</h1>
    <MenuExampleTabularOnLeft/>
    <h1>Down</h1>
  </div>
);

export default FirstExampleMain;

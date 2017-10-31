import React from 'react';
import RandomGiphy from "../../components/RandomGiphy/index";

// általános oldal, a 404-re
const PageNotFound = (props) => (
  <div>
    <h2>Page not found</h2>
    <RandomGiphy tag='sleeping cat'/>
  </div>
);

export default PageNotFound;

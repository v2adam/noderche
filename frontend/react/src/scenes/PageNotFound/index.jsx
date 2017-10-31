import React from 'react';
import { Grid } from 'semantic-ui-react'
import RandomGiphy from "../../components/RandomGiphy/index";

// általános oldal, a 404-re
const PageNotFound = (props) => (
  <Grid textAlign='center'>
    <Grid.Column>
      <h1>Page not found</h1>
      <RandomGiphy tag='sleeping cat'/>
    </Grid.Column>
  </Grid>
);

export default PageNotFound;

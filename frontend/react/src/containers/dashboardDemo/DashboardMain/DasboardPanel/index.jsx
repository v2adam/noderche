import React from 'react';
import { Grid, Responsive, Segment } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';
import PieExample from './Charts/pie';
import BarExample from './Charts/bar';
import LineExample from './Charts/line';

const dataPie = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ]
  }]
};

const dataBar = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const dataLine = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const DashboardPanel = (props) => (


  <Grid className={"stackable"}>
    <Grid.Row columns={3}>
      <Grid.Column>
        <Responsive as={Segment}>
          <PieExample data={dataPie}/>
        </Responsive>
      </Grid.Column>

      <Grid.Column>
        <Responsive as={Segment}>
          <BarExample data={dataBar}/>
        </Responsive>
      </Grid.Column>

      <Grid.Column>
        <Responsive as={Segment}>
          <LineExample data={dataLine}/>
        </Responsive>
      </Grid.Column>

      <Grid.Column>
        <Responsive as={Segment}>
          <LineExample data={dataLine}/>
        </Responsive>
      </Grid.Column>

      <Grid.Column>
        <Responsive as={Segment}>
          <PieExample data={dataPie}/>
        </Responsive>
      </Grid.Column>

    </Grid.Row>
  </Grid>

);

export default DashboardPanel;

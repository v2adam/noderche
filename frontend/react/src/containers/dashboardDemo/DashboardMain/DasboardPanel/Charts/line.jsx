import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = (props) => (
  <div>
    <h2>Line Example</h2>
    <Line data={props.data}/>
  </div>
);

export default LineChart;
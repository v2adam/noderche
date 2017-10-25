import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => (
  <div>
    <h2>Bar Example</h2>
    <Bar data={props.data}/>
  </div>
);

export default BarChart;
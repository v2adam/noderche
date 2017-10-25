import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = (props) => (
  <div>
    <h2>Line Example</h2>
    <Pie data={props.data}/>
  </div>
);

export default PieChart;
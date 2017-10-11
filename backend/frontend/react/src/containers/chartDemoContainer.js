import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { Bar as BarChartJS } from 'react-chartjs';

class ChartDemoContainer extends Component {


  constructor(props) {
    super(props);

    // var LineChart = require('react-chartjs').Line;

    this.state = {
      data: [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
      ],

      dataChart: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
          borderColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
          borderWidth: 1
        }]
      },

      optionsChart: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    };


  }


  componentDidMount() {


  }


  render() {
    return (
      <div className='container'>

        <div className='panel panel-default align-middle'>
          <div className='panel-heading'>Chart.js</div>
          <div className='panel-body'>
            <BarChartJS data={this.state.dataChart} options={this.state.optionsChart}
                         width='600'
                         height='250'/>
          </div>
        </div>

        <div className='panel panel-default align-middle'>
          <div className='panel-heading'>Recharts</div>
          <div className='panel-body'>
            <AreaChart width={730} height={250} data={this.state.data}
                       margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8}/>
                  <stop offset='95%' stopColor='#8884d8' stopOpacity={0}/>
                </linearGradient>
                <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8}/>
                  <stop offset='95%' stopColor='#82ca9d' stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey='name'/>
              <YAxis/>
              <CartesianGrid strokeDasharray='3 3'/>
              <Tooltip/>
              <Area type='monotone' dataKey='uv' stroke='#8884d8' fillOpacity={1}
                    fill='url(#colorUv)'/>
              <Area type='monotone' dataKey='pv' stroke='#82ca9d' fillOpacity={1}
                    fill='url(#colorPv)'/>
            </AreaChart>


            <LineChart width={600} height={300} data={this.state.data}
                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey='name'/>
              <YAxis>
                <Label angle={270} position='left' style={{ textAnchor: 'middle' }}
                       value={'valami hosszú'}/>
              </YAxis>
              <CartesianGrid strokeDasharray='3 3'/>
              <Tooltip/>
              <Legend/>
              <Line type='monotone' dataKey='pv' stroke='#8884d8' activeDot={{ r: 8 }}/>
              <Line type='monotone' dataKey='uv' stroke='#82ca9d' activeDot={{ r: 8 }}/>
            </LineChart>


            <BarChart width={730} height={250} data={this.state.data}>
              <XAxis dataKey='name'/>
              <YAxis/>
              <CartesianGrid strokeDasharray='3 3'/>
              <Tooltip/>
              <Legend/>
              <Bar dataKey='pv' fill='#8884d8'/>
              <Bar dataKey='uv' fill='#82ca9d'/>
            </BarChart>


            <ComposedChart width={730} height={250} data={this.state.data}>
              <XAxis dataKey='name'/>
              <YAxis/>
              <Tooltip/>
              <Legend/>
              <CartesianGrid stroke='#f5f5f5'/>
              <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8'/>
              <Bar dataKey='pv' barSize={20} fill='#413ea0'/>
              <Line type='monotone' dataKey='uv' stroke='#ff7300'/>
            </ComposedChart>
          </div>
        </div>

      </div>
    );
  }
}


// ezzel lehet rákapcsolódni a store-ra, és kinyerni belőle az állapotokat
function mapStateToProps(state) {
  return {};
}


// ezzel érem el az action-öket
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

// ezzel a kiajánlással egy store-ral összekötött komponensem lesz (smart componenet) => container !!!!
export default connect(mapStateToProps, mapDispatchToProps)(ChartDemoContainer);

import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


export class DataTableUsaZip extends Component {


  static customLabel(cell, row) {

    if(cell > 10000000){
      return '<span style="font-weight: bold">Megalopolis</span>';
    }

    if(cell > 1000000){
      return '<span style="font-weight: bold">Metropolis</span>';
    }

    if(cell > 100000){
      return '<span style="font-weight: bold">Large city</span>';
    }

    if(cell > 10000){
      return '<span style="font-weight: bold">City</span>';
    }

    if(cell > 1000){
      return '<span style="font-weight: bold">Town</span>';
    }

    return '<span style="font-weight: bold">Village</span>';

  }

  render() {

    console.log('DUMMY2-render');


    if (this.props.loadingBar) {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      )
    }

    return (
      <div className='container'>
        <BootstrapTable
          data={this.props.usaZip}
          exportCSV
          condensed
          csvFileName = 'valalmi.csv'
          pagination
          striped
          hover>
          <TableHeaderColumn isKey dataField='_id'>Zip Code</TableHeaderColumn>
          <TableHeaderColumn dataField='city' dataSort={true} dataAlign='center' filter={ { type: 'TextFilter', placeholder: 'Keress városra', delay: 500 } } >City</TableHeaderColumn>
          <TableHeaderColumn dataField='pop' dataSort={true} filter={ { type: 'NumberFilter', placeholder: 'Keress', delay: 500, numberComparators: [ '=', '>', '<=' ]  } }>Population</TableHeaderColumn>
          <TableHeaderColumn dataField='state' dataSort={true} filter={ { type: 'RegexFilter', placeholder: 'Keress államra', delay: 500 } }>State</TableHeaderColumn>
          <TableHeaderColumn dataField='pop' dataFormat={this.customLabel} dataSort={true}>City Size</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }

}
import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';

export class SuperSecretUsers extends Component {

  render() {

    if (_.isEmpty(this.props.secretUsers)) {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      )
    }


    return (
      <div className='container'>
        <BootstrapTable
          data={this.props.secretUsers}
          exportCSV
          condensed
          csvFileName='valalmi.csv'
          pagination
          striped
          hover>

          <TableHeaderColumn isKey={true} dataField='_id'>_id</TableHeaderColumn>
          <TableHeaderColumn isKey={false} dataField='userId' dataSort={true}>User
            Id</TableHeaderColumn>
          <TableHeaderColumn isKey={false} dataField='username'
                             dataSort={true}>Username</TableHeaderColumn>
          <TableHeaderColumn isKey={false} dataField='created_ts'
                             dataSort={true}>created</TableHeaderColumn>

        </BootstrapTable>


      </div>
    );
  }

}
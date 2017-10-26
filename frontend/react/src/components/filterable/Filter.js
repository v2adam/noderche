import React, { Component } from 'react';


export class Filter extends Component {

  render() {
    const filterValue = getFilterComponentFromType(this.props.type,this.props.key);
    return (
      <div>
        {this.props.label} : {filterValue}
      </div>
    );
  }
}

function getFilterComponentFromType(type,id) {
  if(type === "TEXT")
    return <input type="text"/>
  else
    return <input type="checkbox" name={id} value="1"/>
}
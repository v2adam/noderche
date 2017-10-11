import React, { Component } from 'react';

export default class UrlParamComponent extends Component {


  render() {
    return (
      <div>
        <h3>Ez az url param page</h3>
        <h4>Paraméter beolvasva: {this.props.match.params.id}</h4>
      </div>
    );

  }
}

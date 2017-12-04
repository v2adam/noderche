import React, { Component } from 'react';

//A táblázat soraiért felelős
export default class TableRow extends Component {

  render() {
    const product = this.props.product;
    return (
      <tr>
        <td>{product.name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}
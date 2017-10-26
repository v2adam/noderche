import React, { Component } from 'react';
import { TableRow } from "./TableRow";


export class FilterableTable extends Component {

  render() {
    const rows = [];

    this.props.products.forEach((product) => {
      rows.push(
        <TableRow product={product} key={product.id}/>
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
import React, { Component } from 'react';
import { TableRow } from "./TableRow";


export class FilterableTable extends Component {

  render() {
    const rows = [];
    const filters = this.props.filters;

    this.props.products.forEach((product) => {
      //Az összes szűrő alkalmazása soronként
      const matches = filters.filter((filter) => filter.filterFunction(product,filter.value));
      //Ha minden szűrő teljesül rá, hozzá adjuk
      if(matches.length === filters.length){
        rows.push(
          <TableRow product={product} key={product.id}/>
        );
      }
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
import React, { Component } from 'react';

import FilterHeader from "./components/FilterHeader";
import FilterableTable from "./components/FilterTable";

// ez egy smart component (container), mert összeköttetésben áll a store-ral, és így ismeri a belső állapotot
export default class FilterableList extends Component {

  constructor(props) {
    super(props);
    //Függvények bindolása
    this.onValueChangeHandler = this.onValueChangeHandler.bind(this);
    //Kezdő állapot
    this.state = {
      filters: [
        {
          id: 1,
          value: '',
          type: "TEXT",
          label: "Név",
          filterFunction: (label, filterValue) => {
            return label.name && label.name.indexOf(filterValue) > -1;
          },
          handleChange: this.onValueChangeHandler
        },
        {
          id: 2,
          value: false,
          type: "CHECKBOX",
          label: "Csak raktáron",
          filterFunction: (label, filterValue) => {
            return !filterValue || label.isStocked
          },
          handleChange: this.onValueChangeHandler
        }
      ]
    };
  }

  //A callbeckel hívott cáltozást kezelő függvény a state frissítéséhez
  onValueChangeHandler(id, value) {
    const filters = this.state.filters.slice();
    const index = filters.findIndex((filter) => filter.id === id);
    if (index > -1) {
      filters[index].value = value;
    }
    this.setState({ filters })
  }

  render() {
    return (
      <div className='container'>
        <FilterHeader filters={this.state.filters}/>
        <FilterableTable products={PRODUCTS} filters={this.state.filters}/>
      </div>
    );
  }
}


const PRODUCTS = [
  { id: 1, price: '$49.99', name: 'Football', isStocked: true },
  { id: 2, price: '$9.99', name: 'Baseball', isStocked: false },
  { id: 3, price: '$29.99', name: 'Basketball', isStocked: true },
  { id: 4, price: '$99.99', name: 'iPod Touch', isStocked: false },
  { id: 5, price: '$399.99', name: 'iPhone 5', isStocked: true },
  { id: 6, price: '$199.99', name: 'Nexus 7', isStocked: false }
];

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './dummy2Container.css';
import { FilterHeader } from "../components/filterable/FilterHeader";
import { FilterableTable } from "../components/filterable/FilterableTable";

// ez egy smart component (container), mert összeköttetésben áll a store-ral, és így ismeri a belső állapotot
class FilterableDemoContainer extends Component {
  render() {
    return (
      <div className='container'>
        <FilterHeader/>
        <FilterableTable products={PRODUCTS}/>
      </div>
    );
  }
}


const PRODUCTS = [
  {id: 1, price: '$49.99',name: 'Football'},
  {id: 2, price: '$9.99', name: 'Baseball'},
  {id: 3, price: '$29.99', name: 'Basketball'},
  {id: 4, price: '$99.99', name: 'iPod Touch'},
  {id: 5, price: '$399.99', name: 'iPhone 5'},
  {id: 6, price: '$199.99', name: 'Nexus 7'}
];

// itt lehetne a store-ból objektumokat meghivatkozni és használni
function mapStateToProps(state) {
  return {};
}

// itt lehetne actionöket behúzni, és 'bekapcsolni a keringésbe' (read more: dispatch )
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

// ezzel a kiajánlással egy store-ral összekötött komponensem lesz (smart componenet) => container !!!!
export default connect(mapStateToProps, mapDispatchToProps)(FilterableDemoContainer);

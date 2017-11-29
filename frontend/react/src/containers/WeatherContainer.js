import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './dummy2Container.css';
import { FilterHeader } from "../components/filterable/FilterHeader";
import { FilterableTable } from "../components/filterable/FilterableTable";

// ez egy smart component (container), mert összeköttetésben áll a store-ral, és így ismeri a belső állapotot
class WeatherContainer extends Component {

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
          label: "Város",
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
        <FilterableTable products={city} filters={this.state.filters}/>
      </div>
    );
  }
}

var city = 'Budapest';

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

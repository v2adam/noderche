import React, { Component } from 'react';
import FilterableList from '../../components/FilterableList';
import Dashboard from "./components/Dashboard";

export default class DashboardMain extends Component {
  render() {
    const sourceComponents = [];
    sourceComponents.push({
      title: "Lista ittttttttt",
      widget: <FilterableList/>,
      defHeight: 2,
      defWidth: 2,
      id: 1
    });


    sourceComponents.push({
      title: "Nagy",
      widget: <FilterableList/>,
      defHeight: 4,
      defWidth: 5,
      id: 2
    });


    sourceComponents.push({
      title: "Kicsi",
      widget: <FilterableList/>,
      defHeight: 1,
      defWidth: 1,
      id: 3
    });

    return <Dashboard source={sourceComponents}/>
  }
}

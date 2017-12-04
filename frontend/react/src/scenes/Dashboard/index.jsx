import React, { Component } from 'react';
import FilterableList from '../../components/FilterableList';
import Dashboard from "./components/Dashboard";

export default class DashboardMain extends Component {
  render() {
    const sourceComponents = [];
    sourceComponents.push({
      title: "Szűrhető dashboard",
      widget: <FilterableList/>,
      defHeight: 2,
      defWidth: 2,
      id: 1
    });

    return <Dashboard source={sourceComponents}/>
  }
}

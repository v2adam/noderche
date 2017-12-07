import React, { Component } from 'react';
import FilterableList from '../../components/FilterableList';
import Dashboard from "./components/Dashboard";
import './style.css';
import RandomGiphy from "../../components/RandomGiphy";
import Placeholder from "../../components/Placeholder";
import { PlaceholderDataTable } from "../../components/PlaceholderDataTable";

export default class DashboardMain extends Component {
  render() {

    // ezek lesznek a grid item-ek
    const sourceComponents = [];
    sourceComponents.push({
      title: "Lista ittttttttt",
      widget: <FilterableList/>,
      background: false,
      defHeight: 2,
      defWidth: 2,
      id: 1
    });


    sourceComponents.push({
      title: "Nagy",
      widget: <FilterableList/>,
      background: true,
      defHeight: 4,
      defWidth: 5,
      id: 2
    });


    sourceComponents.push({
      title: "Kicsi",
      widget: <FilterableList/>,
      background: true,
      defHeight: 1,
      defWidth: 1,
      id: 3
    });

    sourceComponents.push({
      title: "Cica",
      widget: <RandomGiphy tag='sleeping cat'/>,
      background: false,
      defHeight: 2,
      defWidth: 2,
      id: 4
    });

    sourceComponents.push({
      title: "yellow",
      widget: <Placeholder color='yellow' height={100} width={200}/>,
      background: false,
      defHeight: 1,
      defWidth: 1,
      id: 5
    });


    sourceComponents.push({
      title: "blue",
      widget: <Placeholder color='blue' height={100} width={200}/>,
      background: false,
      defHeight: 2,
      defWidth: 2,
      id: 6
    });

    sourceComponents.push({
      title: "datatable",
      widget: <PlaceholderDataTable usaZip={[{
        _id: "01001",
        city: "AGAWAM",
        loc: [
          -72.622739,
          42.070206
        ],
        pop: 15338,
        state: "MA"
      }]}/>,
      background: false,
      defHeight: 3,
      defWidth: 3,
      id: 7
    });


    return <Dashboard source={sourceComponents}/>
  }
}

import React, { Component } from 'react';
import _ from 'lodash';
import FilterableList from '../../components/FilterableList';
import Dashboard from "./components/Dashboard";
import './style.css';
import { fetchComponentType } from "../../services/Dashboard";
import RandomGiphy from "../../components/RandomGiphy";
import Placeholder from "../../components/Placeholder";
import PlaceholderDataTable from "../../components/PlaceholderDataTable";

export default class DashboardMain extends Component {

  constructor(props) {
    super(props);
    this.state = { componentTypes: [] }
  }

  componentDidMount() {
    this.loadComponentType().catch(err => console.log(err));
  }


  loadComponentType = async () => {
    try {
      const fetchedComponents = await fetchComponentType();
      this.setState({ componentTypes: fetchedComponents });
    } catch (err) {
      console.log('fetchedComponents failed' + err);
    }

    this.mapComponents();

  };


  mapComponents = () => {
    const unMapped = this.state.componentTypes.slice();
    const mapped = _.map(unMapped, (componentType) => this.mapWithWidget(componentType));
    this.setState({ componentTypes: mapped });
  };


  mapWithWidget = (componentType) => {
    const mappedComponent = Object.assign({}, componentType);

    switch (componentType.id) {

      case 1:
        mappedComponent.widget = <FilterableList/>;
        break;

      case 2:
        mappedComponent.widget = <FilterableList/>;
        break;

      case 3:
        mappedComponent.widget = <FilterableList/>;
        break;

      case 4:
        mappedComponent.widget = <RandomGiphy tag='sleeping cat'/>;
        break;

      case 5:
        mappedComponent.widget = <Placeholder color='yellow' height={100} width={200}/>;
        break;

      case 6:
        mappedComponent.widget = <Placeholder color='blue' height={100} width={200}/>;
        break;

      case 7:
        mappedComponent.widget = <PlaceholderDataTable usaZip={[{
          _id: "01001",
          city: "AGAWAM",
          loc: [
            -72.622739,
            42.070206
          ],
          pop: 15338,
          state: "MA"
        }]}/>;
        break;

      default:
        break;
    }

    return mappedComponent;

  };


  render() {
    return <Dashboard source={this.state.componentTypes}/>
  }
}

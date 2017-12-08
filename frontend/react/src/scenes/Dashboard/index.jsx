import React, { Component } from 'react';
import _ from 'lodash';
import FilterableList from '../../components/FilterableList';
import Dashboard from "./components/Dashboard";
import './style.css';
import { fetchComponentType, loadGridPosition } from "../../services/Dashboard";
import RandomGiphy from "../../components/RandomGiphy";
import Placeholder from "../../components/Placeholder";
import PlaceholderDataTable from "../../components/PlaceholderDataTable";

export default class DashboardMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      componentTypes: [],
      gridPosition: { lg: [] },
      target: []
    }
  }

  componentDidMount() {
    this.loadComponentType().then(() => this.mapSourceComponents()).catch(err => console.log(err));
    this.loadGridPositionFromDb().then(() => this.mapTargetComponents()).catch(err => console.log(err));
  }


  loadComponentType = async () => {
    try {
      const fetchedComponents = await fetchComponentType();
      this.setState({ componentTypes: fetchedComponents });
    } catch (err) {
      console.log('loadComponentType failed' + err);
    }
  };


  loadGridPositionFromDb = async () => {
    try {
      const fetchedPosition = await loadGridPosition();
      const lg = { lg: fetchedPosition };
      this.setState({ gridPosition: lg });
    } catch (err) {
      console.log('loadGridPositionFromDb failed' + err);
    }
  };


  mapSourceComponents = () => {
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


  mapTargetComponents = () => {
    const mappedTarget = _.map(this.state.gridPosition.lg, (position) => this.mapTarget(position));
    this.setState({ target: mappedTarget });
  };


  mapTarget = (position) => {
    let mappedComponent;

    const fullId = position.i;
    const type = parseInt(fullId.substr(0, fullId.indexOf('_')));

    mappedComponent = Object.assign({}, _.find(this.state.componentTypes, { id: type }));
    mappedComponent.id = fullId;

    return mappedComponent;

  };


  updateTarget = (newTarget) => {
    this.setState({ target: newTarget });
  };


  render() {

    return <Dashboard source={this.state.componentTypes}
                      layout={this.state.gridPosition}
                      target={this.state.target}
                      updateTarget={this.updateTarget}/>
  }
}

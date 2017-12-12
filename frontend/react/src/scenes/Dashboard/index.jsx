import React, { Component } from 'react';
import _ from 'lodash';
import FilterableList from '../../components/FilterableList';
import Dashboard from "./components/Dashboard";
import './style.css';
import { fetchComponentType, loadGridPosition } from "../../services/Dashboard";
import RandomGiphy from "../../components/RandomGiphy";
import Placeholder from "../../components/Placeholder";
import PlaceholderDataTable from "../../components/PlaceholderDataTable";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";


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
      await this.setState({ componentTypes: fetchedComponents });
    } catch (err) {
      console.log('loadComponentType failed' + err);
    }
  };


  loadGridPositionFromDb = async () => {
    try {

      const dashboardId = 101;

      const fetchedPosition = await loadGridPosition(dashboardId);

      //findOne nem hoz vissza semmit, kell a default []
      const lg = _.isEmpty(fetchedPosition) ? { lg: [] } : { lg: fetchedPosition.position };
      await this.setState({ gridPosition: lg });

    } catch (err) {
      console.log('loadGridPositionFromDb failed' + err);
    }
  };


  mapSourceComponents = async () => {
    const unMapped = this.state.componentTypes.slice();
    const mapped = _.map(unMapped, (componentType) => this.mapWithWidget(componentType));
    await this.setState({ componentTypes: mapped });
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


  mapTargetComponents = async () => {
    const mappedTarget = _.map(this.state.gridPosition.lg, (position) => this.mapTarget(position));
    await this.setState({ target: mappedTarget });
  };


  mapTarget = (position) => {
    let mappedComponent;

    // 5_1512981379884
    const fullId = position.i;
    // 5
    const type = parseInt(fullId.substr(0, fullId.indexOf('_')));

    mappedComponent = Object.assign({}, _.find(this.state.componentTypes, { id: type }));
    mappedComponent.id = fullId;

    return mappedComponent;

  };


  updateTarget = (newTarget) => {
    this.setState({ target: newTarget });
  };


  removeFromTarget = (id) => {
    this.setState({ target: _.reject(this.state.target, { id: id }) });
  };


  render() {

    return (

      <div>
        <ButtonToolbar>
          <ButtonGroup>
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
            <Button>4</Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button>5</Button>
            <Button>6</Button>
            <Button>7</Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button>8</Button>
          </ButtonGroup>
        </ButtonToolbar>

        <Dashboard source={this.state.componentTypes}
                   layout={this.state.gridPosition}
                   target={this.state.target}
                   updateTarget={this.updateTarget}
                   removeFromTarget={this.removeFromTarget}/>
      </div>
    );
  }
}

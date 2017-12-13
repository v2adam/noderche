import React, { Component } from 'react';
import _ from 'lodash';
import FilterableList from '../../components/FilterableList';
import DashboardEditor from "./components/DashboardEditor";
import './style.css';
import {
  deleteDashboard, fetchComponentType, fetchExistingDashboard, loadGridPosition,
  newDashboard, saveGridPosition
} from "../../services/Dashboard";
import RandomGiphy from "../../components/RandomGiphy";
import Placeholder from "../../components/Placeholder";
import PlaceholderDataTable from "../../components/PlaceholderDataTable";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";


export default class DashboardEditScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      componentTypes: [],
      gridPosition: { lg: [] },
      target: [],
      dashboardId: 0,
      allDashboard: []
    }
  }

  componentDidMount() {
    this.fetchExistingDashboard();
    this.loadComponentType().then(() => this.mapSourceComponents()).catch(err => console.log(err));
    this.loadGridPositionFromDb().then(() => this.mapTargetComponents()).catch(err => console.log(err));
  }


  fetchExistingDashboard = async () => {
    try {
      const allDashboardId = await fetchExistingDashboard();
      await this.setState({ allDashboard: allDashboardId });
    } catch (err) {
      console.log('fetchExistingDashboard failed' + err);
    }
  };


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
      const fetchedPosition = await loadGridPosition(this.state.dashboardId);
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


  selectDashboard = (id) => {
    this.setState({ dashboardId: id }, () => {
      this.loadGridPositionFromDb().then(() => this.mapTargetComponents()).catch(err => console.log(err))
    });
  };


  deleteDashboard = () => {
    this.deleteDashboardFromDb().catch((err) => console.log(err));
  };


  deleteDashboardFromDb = async () => {
    try {
      const deleteMsg = await deleteDashboard(this.state.dashboardId);
      if (deleteMsg === 204) {
        this.setState({ dashboardId: 0, gridPosition: { lg: [] }, target: [] });
        this.fetchExistingDashboard().then((res) => console.log(res)).catch(err => console.log(err));
      }
    } catch (err) {
      console.log('fetchExistingDashboard failed' + err);
    }
  };


  newDashboard = () => {
    this.newDashboardFromDb().catch((err) => console.log(err));
  };


  newDashboardFromDb = async () => {
    try {
      const newDashboardData = await newDashboard();
      if (newDashboardData.status === 201) {
        this.setState({
          dashboardId: newDashboardData.data.dashboardId,
          gridPosition: { lg: [] },
          target: []
        });
        this.fetchExistingDashboard().then((res) => console.log(res)).catch(err => console.log(err));
      }
    } catch (err) {
      console.log('newDashboardFromDb failed' + err);
    }
  };


  // pozíciók mentése DB-be
  saveChanges = (newLayout) => {
    saveGridPosition(newLayout, this.state.dashboardId).then((res) => console.log(res)).catch((err) => console.log(err));
  };


  generateButtonToolbar = () => {
    return (
      <ButtonToolbar>
        <ButtonGroup>
          {_.map(this.state.allDashboard, (one) => <Button key={one.dashboardId}
                                                           onClick={() => this.selectDashboard(one.dashboardId)}>{one.dashboardId}</Button>)}
        </ButtonGroup>
      </ButtonToolbar>
    );
  };


  render() {
    return (
      <div>
        {this.generateButtonToolbar()}
        <Button className='btn btn-info' onClick={() => this.newDashboard()}>New</Button>
        {this.state.dashboardId}
        <DashboardEditor source={this.state.componentTypes}
                         layout={this.state.gridPosition}
                         target={this.state.target}
                         updateTarget={this.updateTarget}
                         removeFromTarget={this.removeFromTarget}
                         deleteDashboard={this.deleteDashboard}
                         saveChanges={this.saveChanges}/>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FilterableDemoContainer from "../containers/filterableDemoContainer";
import ChartDemoContainer from "../containers/chartDemoContainer";
import { Dashboard } from "../components/draggable/dashboard";
import GoogleMapsContainer from "../containers/googleMapsContainer";

class DashboardContainer extends Component {
  render() {
    const sourceComponents = [];
    sourceComponents.push({
      title: "Szűrhető dashboard",
      widget: <FilterableDemoContainer/>,
      defHeight: 2,
      defWidth: 2,
      id: 1
    });

    sourceComponents.push({
      title: "Diagramm demó",
      widget: <ChartDemoContainer/>,
      defHeight: 14,
      defWidth: 10,
      id: 2
    });

    sourceComponents.push({
      title: "Google maps",
      widget: <GoogleMapsContainer/>,
      defHeight: 3,
      defWidth: 4,
      id: 3
    });

    return <Dashboard source={sourceComponents}/>
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
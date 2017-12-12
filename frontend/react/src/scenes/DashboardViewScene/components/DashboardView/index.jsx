import React, { Component } from 'react'
import "./style.css"

import PropTypes from 'prop-types';
import Target from "./Target";

export default class DashboardView extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps() {
    this.setState({ layout: this.props.layout });
  }

  render() {
    return (
      <div id="dashboard" className="dashboard-container">
        <Target widgets={this.props.target}
                layouts={this.state.layout}/>
      </div>
    );
  }
}

DashboardView.defaultProps = {
  target: [],
  layout: { lg: [] }
};

DashboardView.propTypes = {
  target: PropTypes.array,
  layout: PropTypes.objectOf(PropTypes.array)
};


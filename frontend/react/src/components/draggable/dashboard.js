import React, { Component } from 'react'
import "../../styles/draggableDashboard.css"
import _ from "lodash";

import PropTypes from 'prop-types';
import { SourceContainer } from "./sourceContainer";
import { TargetContainer } from "./targetContainer";


export class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nextTargetId: 0,
      source: this.props.source,
      target: this.props.target,
      draggedObject: undefined,
      isEditing: this.props.isEditing,
      layout: this.props.layout
    };
  }

  onDragStart = (component) => {
    if (_.isUndefined(component)) {
      return;
    }

    this.setState({ draggedObject: component });
  };

  onLayoutChange = (layout, allLayout) => {
    let newLayout = allLayout.lg.slice();
    newLayout.forEach((l) => {l.static = this.state.isEditing});
    const layouts = {lg : newLayout};
    this.setState({ layout: layouts });
  };

  getNextTargetId = () => {
    const id = this.state.nextTargetId;
    this.setState({ nextTargetId: id + 1 });
    return id;
  };

  addComponentToTarget = (component) => {
    let newTarget = this.state.target.slice();
    let newLayout = this.state.layout.lg.slice();
    const id = this.getNextTargetId();
    let newComponent = Object.assign({}, component);
    newComponent.id = component.id + "_" + id;
    newTarget.push(newComponent);
    newLayout.push({
      x: 0,
      y: 0,
      h: component.defHeight,
      w: component.defWidth,
      i: component.id + "_" + id,
      minW: component.defWidth,
      minH: component.defHeight,
      static: this.state.isEditing
    });
    this.setState({
      target: newTarget,
      layout: { lg: newLayout}
    });
  };

  changeStatic = () => {
    const isEditing = !this.state.isEditing;
    let newLayout = this.state.layout.lg.slice();
    newLayout.forEach((l) => {l.static = isEditing});
    const layouts = {lg : newLayout};
    this.setState({
      layout: layouts,
      isEditing: isEditing
    });
  };

  onRemoveItem = (id) => {
    console.log("onRemoveItem: " + id);
    this.setState({ target: _.reject(this.state.target, { id: id }) });
  };

  render() {
    return (
      <div id="dashboard" className="dashboard-container">
        <div className="sticky-edit-div" id="editDiv">
          <button onClick={() => this.changeStatic()}>{this.state.isEditing ? "Mentés" : "Módosítás"}</button>
        </div>
        <div id="data">
          <SourceContainer components={this.state.source}
                           currentWidget={this.state.draggedObject}
                           onDragStart={this.onDragStart}/>

          <TargetContainer widgets={this.state.target}
                           layouts={this.state.layout}
                           underEdit={this.state.isEditing}
                           currentWidget={this.state.draggedObject}
                           onRemoveItem={this.onRemoveItem}
                           onComponentDropped={this.addComponentToTarget}
                           onLayoutChange={this.onLayoutChange}/>
        </div>
      </div>
    );
  }
}

Dashboard.defaultProps = {
  target: [],
  source: [],
  layout: {lg : []},
  isEditing: true
};

Dashboard.propTypes = {
  target: PropTypes.array,
  source: PropTypes.array,
  layout: PropTypes.objectOf(PropTypes.array),
  isEditing: PropTypes.bool
};
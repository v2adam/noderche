import React, { Component } from 'react'
import "./style.css"
import _ from "lodash";

import PropTypes from 'prop-types';
import Source from "./components/Source";
import Target from "./components/Target";

export default class DashboardEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      draggedObject: undefined,
      isEditing: this.props.isEditing,
    };
  }

  componentWillReceiveProps() {
    this.setState({ layout: this.props.layout });
  }


  onDragStart = (component) => {
    if (_.isUndefined(component)) {
      return;
    }

    this.setState({ draggedObject: component });
  };

  // mozgatás után az új elrendezést adja vissza
  onLayoutChange = (layout, allLayout) => {
    console.log('onLayoutChange');
    let newLayout = allLayout.lg.slice();
    newLayout.forEach((l) => {
      l.static = this.state.isEditing
    });

    const layouts = { lg: newLayout };
    this.setState({ layout: layouts });
  };


  // TODO: valami biztosabb megoldást kitalálni
  getNextTargetId = () => {
    return (new Date).getTime();
  };


  // új elem hozzáadása a rácshoz
  addComponentToTarget = (component) => {
    console.log('addComponentToTarget');
    let newLayout = this.state.layout.lg.slice();
    const id = this.getNextTargetId();
    let newComponent = Object.assign({}, component);
    newComponent.id = component.id + "_" + id;
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
      layout: { lg: newLayout },
      currentWidget: undefined,
      draggedObject: undefined
    });


    // target-be is bekerül az új
    let newTarget = this.props.target.slice();
    newTarget.push(newComponent);
    this.props.updateTarget(newTarget);

  };


  // szerkesztés gomb hatására
  changeStatic = () => {
    console.log('changeStatic');

    const isEditing = !this.state.isEditing;
    let newLayout = this.state.layout.lg.slice();

    if (newLayout.length > 0 && newLayout[newLayout.length - 1].i === "temp") {
      newLayout.splice(-1, 1);
    }

    newLayout.forEach((l) => {
      l.static = isEditing
    });

    newLayout.push({
      x: 0,
      y: 0,
      h: 0,
      w: 0,
      i: "temp"
    });


    const layouts = { lg: newLayout };
    this.setState({
      layout: layouts,
      isEditing: isEditing
    });


  };


  // pozíciók mentése DB-be
  saveChanges = () => {
    const filtered = _.reject(this.state.layout.lg, { i: 'temp' });
    this.props.saveChanges({ lg: filtered });
  };


  // elem eltávolítása
  onRemoveItem = (id) => {
    this.props.removeFromTarget(id);
  };

  //TODO: nem működik, hibás a grid library, nem kezeli jó a static-ot
  // lock módosítása
  onLockItem = (component) => {
    console.log('onLockItem');

    let newLayout = this.state.layout.lg.slice();

    // komponens átállítása
    const temp = Object.assign({}, _.find(this.state.layout.lg, { i: component.id }));
    temp.static = !temp.static;

    // eltávolítás a régiekből
    _.remove(newLayout, { i: component.id });

    // berakni az új elemet
    newLayout.push(temp);

    const layouts = { lg: newLayout };

    this.setState({
      layout: layouts,
    });
  };


  deleteDashboard = () => {
    this.props.deleteDashboard();
  };


  render() {
    return (
      <div id="dashboard" className="dashboard-container">
        <div className="sticky-edit-div" id="editDiv">
          <button
            onClick={() => this.changeStatic()}>{this.state.isEditing ? "Mozgatás" : "Szerkesztés"}</button>
          <button
            onClick={() => this.saveChanges()}>Save
          </button>
          <button
            onClick={() => this.deleteDashboard()}>Delete dashboard
          </button>
        </div>
        <div id="data">
          <Source components={this.props.source}
                  currentWidget={this.state.draggedObject}
                  onDragStart={this.onDragStart}/>

          <Target widgets={this.props.target}
                  layouts={this.state.layout}
                  underEdit={this.state.isEditing}
                  currentWidget={this.state.draggedObject}
                  onRemoveItem={this.onRemoveItem}
                  onComponentDropped={this.addComponentToTarget}
                  onLayoutChange={this.onLayoutChange}
                  onLockItem={this.onLockItem}/>
        </div>
      </div>
    );
  }
}

DashboardEditor.defaultProps = {
  target: [],
  source: [],
  layout: { lg: [] },
  isEditing: true
};

DashboardEditor.propTypes = {
  target: PropTypes.array,
  source: PropTypes.array,
  layout: PropTypes.objectOf(PropTypes.array),
  isEditing: PropTypes.bool,
  updateTarget: PropTypes.func.isRequired,
  removeFromTarget: PropTypes.func.isRequired,
  deleteDashboard: PropTypes.func.isRequired,
  saveChanges: PropTypes.func.isRequired
};


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Button, ButtonToolbar, Panel } from "react-bootstrap";

const ResponsiveReactGridLayout = WidthProvider(Responsive);


export default class TargetContainer extends Component {

  // komponensek kirenderelése
  createTargetComponent = (component) => {
    return (
      <div key={component.id.toString()} style={{ overflow: "hidden" }} className="well">
        <Panel style={{ overflow: "hidden" }} header={
          <div>
            {component.id}
            <ButtonToolbar style={this.props.underEdit ? { display: "none" } : {}}>
              <Button bsStyle="primary" bsSize="xsmall"
                      onClick={() => this.props.onLockItem(component)}>{component.static ? "Unlock" : "Lock"}</Button>
              <Button bsStyle="danger" bsSize="xsmall"
                      onClick={() => this.props.onRemoveItem(component.id)}>x</Button>
            </ButtonToolbar>
          </div>}>
          <fieldset disabled={this.props.underEdit}>
            {component.widget}
          </fieldset>
        </Panel>
      </div>
    );
  };


  // default beállítások
  getDashboardSettings = () => {
    return ({
      className: "layout",
      cols: { lg: 12 },
      breakpoints: { lg: 1200 },
      rowHeight: 100,
    });
  };

  allowDrop = (event) => {
    if (_.isUndefined(this.props.currentWidget)) {
      return;
    }
    event.preventDefault();
  };

  // új elem hozzáadása a rácshoz
  onComponentDropped = (event) => {
    if (_.isUndefined(this.props.currentWidget)) {
      return;
    }

    this.props.onComponentDropped(this.props.currentWidget);

  };

  render() {
    return (
      <div id="target" className="targetDiv"
           onDrop={(event) => this.onComponentDropped(event)}
           onDragOver={(event) => this.allowDrop(event)}>
        <ResponsiveReactGridLayout onLayoutChange={this.props.onLayoutChange}
                                   layouts={this.props.layouts}
                                   compactType={null}
                                   {...this.getDashboardSettings()}>
          {_.map(this.props.widgets, (el) => this.createTargetComponent(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

TargetContainer.propTypes = {
  widgets: PropTypes.array,
  layouts: PropTypes.object,
  underEdit: PropTypes.bool,
  currentWidget: PropTypes.object,
  onLayoutChange: PropTypes.func.isRequired,
  onComponentDropped: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onLockItem: PropTypes.func.isRequired
};

TargetContainer.defaultProps = {
  widgets: [],
  layouts: {},
  underEdit: false
};
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Button, Panel } from "react-bootstrap";
import { getDashboardSettings } from '../../../../../../misc/utils';

const ResponsiveReactGridLayout = WidthProvider(Responsive);


export default class TargetContainer extends Component {

  // komponensek egységes keretben
  createTargetComponent = (component) => {
    return (
      <div key={component.id.toString()} style={{ overflow: "hidden" }}
           className={component.background ? "well" : {}}>
        <Panel style={{ overflow: "hidden" }} header={
          <span>
          <span>
            {`${component.title}_${component.id}`}
          </span>
            <span style={this.props.underEdit ? { display: "none" } : { float: "right" }}>
              <Button bsStyle="primary" bsSize="xsmall"
                      onClick={() => this.props.onLockItem(component)}>{component.static ? "Unlock" : "Lock"}</Button>
              <Button bsStyle="danger" bsSize="xsmall"
                      onClick={() => this.props.onRemoveItem(component.id)}>x</Button>
            </span>
          </span>}>
          <fieldset disabled={this.props.underEdit}>
            {component.widget}
          </fieldset>
        </Panel>
      </div>
    );
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
    console.log('---------render3------------');
    console.log(this.props.layouts);
    console.log(this.props.widgets);
    console.log('----------------------------');

    return (
      <div id="target" className="targetDiv"
           onDrop={(event) => this.onComponentDropped(event)}
           onDragOver={(event) => this.allowDrop(event)}>
        <ResponsiveReactGridLayout
          onLayoutChange={this.props.onLayoutChange}
          layouts={this.props.layouts}
          compactType={null}
          {...getDashboardSettings()}>
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
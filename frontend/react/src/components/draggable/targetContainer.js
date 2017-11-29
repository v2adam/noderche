import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export class TargetContainer extends Component {

  createTargetComponent = (component) => {
    return (
      <div key={component.id.toString()} className={"resizable-box"}>
        <span className="remove" style={this.props.underEdit ? { display: "none" } : {}}
              onClick={() => this.props.onRemoveItem(component.id)}>
          x
        </span>
        {component.widget}
      </div>
    );
  };

  getDashboardSettings = () => {
    return ({
      className: "layout",
      cols: { lg: 12 },
      breakpoints: { lg: 1200 },
      rowHeight: 100,
    });
  };

  allowDrop = (event) => {
    if (_.isUndefined(this.props.currentWidget.id)) {
      return;
    }

    event.preventDefault();
  };

  onComponentDropped = (event) => {
    if (_.isUndefined(this.props.currentWidget.id)) {
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
                                   {...this.getDashboardSettings()} layouts={this.props.layouts}
                                   compactType={null}>
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
  onRemoveItem: PropTypes.func.isRequired
};

TargetContainer.defaultProps = {
  widgets: [],
  layouts: {},
  underEdit: false
}
;
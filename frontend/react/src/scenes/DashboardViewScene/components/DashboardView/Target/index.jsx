import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Panel } from "react-bootstrap";
import { getDashboardSettings } from '../../../../../misc/utils';

const ResponsiveReactGridLayout = WidthProvider(Responsive);


export default class Target extends Component {

  createTargetComponent = (component) => {
    return (
      <div key={component.id.toString()} style={{ overflow: "hidden" }}
           className={component.background ? "well" : {}}>
        <Panel style={{ overflow: "hidden" }} header={
          <span>
            {`${component.title}_${component.id}`}
          </span>}>
          <fieldset>
            {component.widget}
          </fieldset>
        </Panel>
      </div>
    );
  };

  render() {
    return (
      <div id="target" className="targetDiv">
        <ResponsiveReactGridLayout
          layouts={this.props.layouts}
          compactType={null}
          {...getDashboardSettings()}>
          {_.map(this.props.widgets, (el) => this.createTargetComponent(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

Target.propTypes = {
  widgets: PropTypes.array,
  layouts: PropTypes.object
};

Target.defaultProps = {
  widgets: [],
  layouts: {},
};
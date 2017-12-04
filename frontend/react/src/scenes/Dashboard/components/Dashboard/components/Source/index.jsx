import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import DraggableComponent from "./components/DraggableComponent"

export default class Source extends Component {

  onDragStart = (id) => {
    this.props.onDragStart(this.props.components.find(w => w.id.toString() === id.toString()));
  };

  createSourceComponent = (component) => {
    return (
      <DraggableComponent id={component.id.toString()}
                          key={component.id.toString()}
                          widget={{ value: component.title }}
                          isSource={true}
                          deleteFromContainer={false}
                          onDragStartFunction={this.onDragStart}/>
    );
  };

  allowDrop = (event) => {
    //Never allow on source
  };

  render() {
    return (
      <div id="source" className="sourceDiv"
           onDragOver={(event) => this.allowDrop(event)}>
        <div className="sticky-source-content">
          {_.map(this.props.components, (component) => this.createSourceComponent(component))}
        </div>
      </div>
    );
  }
}

Source.propTypes = {
  components: PropTypes.array,
  currentWidget: PropTypes.object,
  onDragStart: PropTypes.func.isRequired,
};

Source.defaultProps = {
  components: [],
  currentWidget: undefined
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class DraggableComponent extends Component {
  onDragStart = (event) => {
    if(this.props.isSource){
      this.props.onDragStartFunction(this.props.id);
    }
  };


  dragging = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div style={this.props.isSource ? {} : {height: "100%"}}>
        <div
          draggable={this.props.isSource}
          onDragStart={(event) => this.onDragStart(event)}
          onDrag={(event) => this.dragging(event)} className="draggable-component">
          {this.props.isSource ? this.props.widget.value : this.props.widget}
        </div>
      </div>
    );
  }
}

DraggableComponent.propTypes = {
  onDragStartFunction: PropTypes.func.isRequired,
  isSource: PropTypes.bool,
  widget: PropTypes.object
};

DraggableComponent.defaultProps = {
  isSource: true,
  widget: {}
};
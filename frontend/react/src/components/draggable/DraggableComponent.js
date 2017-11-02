import React, { Component } from 'react';


export class DraggableComponent extends Component {

  onDragStart = (event) => {
    this.props.onDragStartFunction(this.props);
  };


  dragging = (event) => {
    event.preventDefault();
  };

  render(){
    return (
      <div>
        <span className="remove" onClick={() => this.props.onRemoveItem(this.props.id)}>x</span>
        <div
          draggable={this.props.isSource}
          onDragStart={(event) => this.onDragStart(event)}
          onDrag={(event) => this.dragging(event)} className="draggable-component">
          {this.props.component}
        </div>
      </div>
    );
  }
}
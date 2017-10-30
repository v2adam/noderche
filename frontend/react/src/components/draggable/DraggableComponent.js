import React, { Component } from 'react';


export class DraggableComponent extends Component {

  constructor(props){
    super(props);
    this.state = {
      x : props.x,
      y : props.y
    };
  }

  onDragStart = (event) => {
    this.props.onDragStartFunction(this.props);
  };


  dragging = (event) => {
    event.preventDefault();
  };

  render(){
    return (
      <div
        draggable="true"
        onDragStart={(event) => this.onDragStart(event)}
        onDrag={(event) => this.dragging(event)} className="draggable-component">
        {this.props.component}
      </div>
    );
  }
}
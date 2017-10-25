import React, { Component } from 'react'
import { Responsive, Segment } from 'semantic-ui-react'

export default class MenuExampleHeaderVertical extends Component {
  handleItemClick = name => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state || {};

    return (
      <Responsive as={Segment}>

        <h4>Valami1</h4>
        <h4>Valami2 nagyon nagyon hosszú lesz</h4>
        <h4>Valami3</h4>
        <h4>Valami4</h4>


      </Responsive>
    )
  }
}

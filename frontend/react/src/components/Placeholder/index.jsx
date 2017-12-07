import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Placeholder extends Component {

  render() {
    return (
      <div>
        <svg width={this.props.width} height={this.props.height}>
          <rect width={this.props.width} height={this.props.height} fill={this.props.color}/>
        </svg>
      </div>
    );
  }
}

Placeholder.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};


export default Placeholder;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import loadGiphy from '../RandomGiphy/services/LoadGiphy';

class RandomGiphy extends Component {

  state = { src: '' };

  componentDidMount() {
    loadGiphy(this.props.tag).then(res => {
      if (res.data.data.fixed_height_downsampled_url) {
        this.setState({ src: res.data.data.fixed_height_downsampled_url })
      } else {
        this.setState({ src: '/images/404.png' })
      }
    }).catch((err) => this.setState({ src: '/images/404.png' }));
  }

  render() {
    return (
      <section>
        <img src={this.state.src} alt='404'/>
      </section>
    );
  }
}

RandomGiphy.propTypes = {
  tag: PropTypes.string
};


export default RandomGiphy;

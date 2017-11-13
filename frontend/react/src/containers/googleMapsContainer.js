import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GoogleMapReact from 'google-map-react';
import './dummy2Container.css';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

//Google API key: AIzaSyDK4S6OGTynniGOqtPSmtnuP3ibMKw2v6w
class GoogleMapsContainer extends Component {
  static defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    zoom: 11
  };

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={41.0}
          lng={19.0}
          text={'Google maps beágyazás teszt'}
        />
      </GoogleMapReact>
    );
  }
}

// itt lehetne a store-ból objektumokat meghivatkozni és használni
function mapStateToProps(state) {
  return {};
}

// itt lehetne actionöket behúzni, és 'bekapcsolni a keringésbe' (read more: dispatch )
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

// ezzel a kiajánlással egy store-ral összekötött komponensem lesz (smart componenet) => container !!!!
export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapsContainer);

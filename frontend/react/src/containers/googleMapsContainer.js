import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GoogleMapReact from 'google-map-react';
//import './dummy2Container.css';

const AnyReactComponent = ({ text }) => (
  <div style={{
    position: 'relative', color: 'white', background: 'red',
    height: 40, width: 60, top: -20, left: -30,
  }}>
    {text}
  </div>
);

//Google API key: AIzaSyDK4S6OGTynniGOqtPSmtnuP3ibMKw2v6w
class GoogleMapsContainer extends Component {
  static defaultProps = {
    center: { lat: 41.0, lng: 19.0 },
    zoom: 11
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
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
      </div>
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

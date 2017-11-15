import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GoogleMapReact from 'google-map-react';
import './dummy2Container.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


//Google API key: AIzaSyDK4S6OGTynniGOqtPSmtnuP3ibMKw2v6w
export class GoogleMapsContainer extends Component {
  render() {
    return (
      <div className='container'>
        <Map google={this.props.google} zoom={14}>

          <Marker onClick={this.onMarkerClick}
                  name={'Current location'}/>

          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDK4S6OGTynniGOqtPSmtnuP3ibMKw2v6w"
})(GoogleMapsContainer)


// itt lehetne a store-ból objektumokat meghivatkozni és használni
function mapStateToProps(state) {
  return {};
}

// itt lehetne actionöket behúzni, és 'bekapcsolni a keringésbe' (read more: dispatch )
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

// ezzel a kiajánlással egy store-ral összekötött komponensem lesz (smart componenet) => container !!!!
//export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapsContainer);

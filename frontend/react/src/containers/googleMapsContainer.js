import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GoogleMapReact from 'google-map-react';
import './dummy2Container.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


//Google API key: AIzaSyDK4S6OGTynniGOqtPSmtnuP3ibMKw2v6w
export class GoogleMapsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }

    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  // noinspection JSAnnotator
  onMarkerClick = function (props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = function (props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render = function () {
    return (
      <Map google={this.props.google}
           onClick={this.onMapClicked}>
        <Marker onClick={this.onMarkerClick}
                name={'Current location'}/>

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    )
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

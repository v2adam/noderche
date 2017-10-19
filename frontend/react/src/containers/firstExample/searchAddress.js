import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import promisify from 'es6-promisify';

import { saveHistorySearch } from '../../actions/firstExample/firstExampleActions';

class SearchAddress extends Component {

  constructor() {
    super();

    const myGoogleAPIKey = { key: 'AIzaSyBbzH2sZTViqhwAYckpLnWQh_AQIKvYlG8' };

    this.gMapsClient = require('@google/maps').createClient(myGoogleAPIKey);

    // komponensem belső állapotok
    this.state = {
      address: '',
      gResponse: '',
    };

    // ha nem használsz => -t a fv deklarálásnál, akkor bindolni kell
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
  }


  // ez arra van, ha begépelsz valamit, akkor változzon a beírt szöveg
  handleChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }


  useGoogleApi = async () => {
    const promiseGMapsClient = promisify(this.gMapsClient.geocode);
    try {

      if (this.state.address !== '') {
        const result = await promiseGMapsClient({ address: this.state.address });
        this.setState({ gResponse: JSON.stringify(result) });
        // elmentem a store-ba a keresési kifejezést
        this.props.saveHistorySearch({address: this.state.address});
      } else {
        this.setState({ gResponse: '' });
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className='container'>
        <div>Previous: {JSON.stringify(this.props.lastSearchedAddress)}</div>
        <h1>Search address</h1>
        <input type="text"
               required="required"
               placeholder="Search for an address"
               value={this.state.address}
               onChange={this.handleChangeAddress}
               className="form-control"/>
        <button className='btn btn-success' onClick={() => this.useGoogleApi()}>Search</button>
        <h4>Result: {this.state.gResponse}</h4>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lastSearchedAddress: state.firstExample.lastSearchedAddress,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveHistorySearch: saveHistorySearch }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchAddress);

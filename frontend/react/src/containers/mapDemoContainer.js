import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import promisify from 'es6-promisify';

// itt egy egyszerű példa, hogy nagyjából mi ez a callback-promise-async/await
class MapDemoContainer extends Component {


  // a () => miatt autobind van
  useGoogleApi = async () => {
    // mindenegyik megoldás ugyan azt csinálja!

    /*
        //**************************************************************************
        // callback-ek
        //**************************************************************************

        this.gMapsClient.geocode({ address: this.state.address }, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            this.setState({ gResponse: JSON.stringify(result) });
          }
        });
    */

    /*
        //**************************************************************************
        // promise1
        //**************************************************************************

        // kb így lehet egy callback-esből promise-t csinálni kézzel
        // ez egy olyan függvény lesz, amit ha meghívsz akkor egy promise-t ad vissza
        const promiseGMapsClient = (paramObject) => {
          // itt is autobind van, => nélkül nem látná a gMapsClient-et mert más a context
          return new Promise((resolve, reject) => {
            this.gMapsClient.geocode(paramObject, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
        };

        // használható itt a .then mert egy promise-t ad vissza a promiseGMapsClient()
        promiseGMapsClient({ address: this.state.address }).then(result => {
          this.setState({ gResponse: JSON.stringify(result) });
        }).catch(err => console.log(err));

    */
    /*
        //**************************************************************************
        // promise2
        //**************************************************************************

        // promise-á alaktja automatikusan
        // (node-on az util-ban van, már nem kell bluebird)
        const promiseGMapsClient = promisify(this.gMapsClient.geocode);

        promiseGMapsClient({ address: this.state.address }).then(result => {
          this.setState({ gResponse: JSON.stringify(result) });
        }).catch(err => console.log(err));
    */


    //**************************************************************************
    // async-await
    //**************************************************************************

    // kb úgy olvasható mint a java-ban megszoktuk
    const promiseGMapsClient = promisify(this.gMapsClient.geocode);

    try {
      // await kulcsszó után promise-t
      const result = await promiseGMapsClient({ address: this.state.address });
      // így megvárja az eredményt
      // ha kiveszed fent az await-et, akkor nem fog látszódni az oldalon eredmény
      // mert továbbszalad a kód mielőtt lenne adat
      this.setState({ gResponse: JSON.stringify(result) });
    } catch (err) {
      console.log(err);
    }


  };

  // az async-nak kell nenni, hogy az await működjön, a többihez nem kell

  constructor() {
    // react komponensnél kell a super()
    super();

    //lehet így is
    // import * as gmaps from '@google/maps'; //importok közé ezt
    // this.gMapsClient = gmaps.createClient({ key: 'AIzaSyBbzH2sZTViqhwAYckpLnWQh_AQIKvYlG8' });


    // vagy akár így, közletlenül behúzni
    this.gMapsClient = require('@google/maps').createClient({ key: 'AIzaSyBbzH2sZTViqhwAYckpLnWQh_AQIKvYlG8' });


    // komponensem belső állapotok
    this.state = {
      address: '', // ide kerül az input-ba írt szöveg
      gResponse: '' // itt lesz az eredmény
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


  render() {
    return (
      <div className='container'>
        <h1>Map Demo page</h1>
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

// itt lehetne a store-ból objektumokat meghivatkozni és használni
function mapStateToProps(state) {
  return {};
}

// itt lehetne actionöket behúzni, és 'bekapcsolni a keringésbe' (read more: dispatch )
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapDemoContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import promisify from 'es6-promisify';

// itt egy egyszerű példa, hogy nagyjából mi ez a callback-promise-async/await
class MapDemoContainer extends Component {

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


  // az async-nak kell nenni, hogy az await működjön, a többihez nem kell
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


  // ***********************************************************************************************
  // példa a callback használatára
  // ***********************************************************************************************


  // x sec múlva visszaadja az eredményt a callbackFv-nek
  exampleAsyncFunction(waitSec, callbackFv) {

    try {
      // ha itt dobsz hibát, akkor a külső catch
      // throw new Error('Bottom catch');

      // a setTimeout x sec múlva kezdi csak el a tartalma feldolgozását
      setTimeout(() => {
        // ha itt dobsz hibát nem kapja el senki
        // throw new Error('Uncaught Error');

        try {
          // ha itt dobsz hibát, akkor a közvetlenül alatta lévő kapja el
          // throw new Error('Inside catch');

          // x sec múlva visszahív erre
          const res = `wait ${waitSec} sec`;
          callbackFv(null, res);

        } catch (err) {
          callbackFv(err, null);
        }
      }, waitSec);
    } catch (err) {
      // ha hiba van, akkor ide
      callbackFv(err);
    }

  }


  callBackExample = () => {

    this.exampleAsyncFunction(2000, (err, result) => {
      // amint végzett az exampleAsyncFunction, a callbackFv-nek adott eredmények itt lesznek
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });

  };

  // ***********************************************************************************************
  // példa a promise használatára
  // ***********************************************************************************************

  asyncThing = (value) => {

    // ha itt dobsz hibát, akkor elszáll az egész, mert még nincs egy promise-ban
    //throw new Error('this will be an Uncaught Error');

    return new Promise((resolve, reject) => {
      // ha egy promise-ban hibát dobsz, akkor elkapj a láncolt catch
      // throw new Error('throw error inside a promise');

      // a reject ugyan az mint a fenti hibadobás
      // reject('reject inside a promise');

      setTimeout(() => {
        // ha itt dobsz hibát, akkor elszáll -> try-catch-ben elkapod és utána reject-eld
        // throw new Error('Uncaught Error');
        resolve(value); // eredményt visszaadom
      }, value);
    });
  };


  promiseExample = () => {

    // 5 sec alatt fut le
    // meghívódik -> 3-sec után logolás + újabb promise hívás -> 2-sec után logolás
    // ha a .then-ekben hibát dobnál, akkor rögtön a catch-be kerül
    this.asyncThing(3000).then(res => {
      // első promise eredménye kész
      console.log(`Első promise: ${res} sec`);
      // visszaadok egy újabb promise-t, amit a második then-nel kezelek
      return this.asyncThing(2000);
    }).then(res => {
      // második promise eredménye kész
      console.log(`Második promise: ${res} sec`);
    }).catch(err => console.log(`Catch ág: ${err}`));

  };


  /*
  valami = () => {

    return [1, 2, 3, 4].map(async (value) => {
      const v = await this.asyncThing(value);
      return v * 2;
    });

  };
*/


  /*
    Promise.all([this.valami()]).then(values => {

     onsole.log(values[0][0].then(eredm => console.log(eredm)).catch(err => console.log(err)));

    });
*/


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
        <button className='btn btn-success' onClick={() => this.callBackExample()}>Callback</button>
        <button className='btn btn-success' onClick={() => this.promiseExample()}>Promise</button>
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

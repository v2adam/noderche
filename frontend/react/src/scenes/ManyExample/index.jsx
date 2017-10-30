import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Upload from 'rc-upload';
import axios from 'axios';
import CircularProgressbar from 'react-circular-progressbar';
import * as XLSX from 'xlsx';
import Dropzone from 'react-dropzone';

import './style.css';
import { DataTableUsaZip } from '../ManyExample/components/DataTableUsaZip';
import {
  downloadXlsx,
  fetchUsaZip,
  uploadDocumentRequest
} from '../../services/ManyExample/actions'

class ManyExample extends Component {

  constructor(props) {
    super(props);

    this.uploaderProps = {
      action: '/api/v1/dummy/upload', //ezt az url-t hívja meg
      data: { valamipluszmenzo: 'ezapluisz' },

      // tokenemet továbbadom neki
      headers: {
        Authorization: axios.defaults.headers.common.Authorization,
      },

      multiple: true,

      beforeUpload(file) {
        console.log('beforeUpload', file.name);
      },
      onStart: (file) => {
        this.setState({ count: 0 });
        console.log('onStart', file.name);
      },
      onSuccess(file) {
        console.log('onSuccess', file);
      },
      onProgress(step, file) {
        this.setState({ count: Math.round(step.percent) });
        console.log('onProgress', Math.round(step.percent), file.name);
      },
      onError(err) {
        console.log('onError', err);
      },
    };


    this.state = {
      count: 0,
      files: [],
      accepted: [],
      rejected: []
    };

    // ha arrow van, akkor nem kell a bind
    // this.downloadXlsFromDB = this.downloadXlsFromDB.bind(this);

    // a belső függvényeket is bindolni kell
    this.uploaderProps.onProgress = this.uploaderProps.onProgress.bind(this);
    this.uploaderProps.onSuccess = this.uploaderProps.onSuccess.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }


  // fájlok feldolgozása
  processMyFiles = (acceptedFiles) => {

    console.log('ittt');

    acceptedFiles.forEach(file => {
      console.log('Feltöltött file metaadatai lent: ');
      console.log(file);
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsBinaryString = reader.result;

        // az excel-t beparsolom egy workbook-á, ebből már kinyerhetőek az adatok
        const wb = XLSX.read(fileAsBinaryString, { type: 'binary' });


        console.log(wb);
      };

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);
    });

  };


  // fájlok beolvasás
  onDrop(accepted, rejected) {
    // csak a megfelelő MIME alapján engedi feldolgozni
    this.setState({ accepted, rejected });

    // továbbadom feldolgozásra
    //this.processMyFiles(accepted);

  }


  incr = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  decr = () => {
    this.setState({
      count: this.state.count - 1
    });
  };


  componentDidMount() {
    this.props.fetchUsaZip();
  }

  // ez egy autobind is egyben, mert az arrow function egy this-t ad vissza
  // adatbázisban lévőkből állít elő XLSX-et
  downloadXlsFromDB = () => {
    this.props.downloadXlsxFromDB();
  };


  render() {
    return (
      <div className='container'>
        <button className='btn btn-warning' onClick={() => this.downloadXlsFromDB()}>XLSX from DB
        </button>
        <Upload {...this.uploaderProps} name="rc_upload" ref="inner">
          <button className='btn btn-info'>fájl rendszerbe feltölt</button>
        </Upload>
        <button className='btn btn-success' onClick={() => this.incr()}>Inc</button>
        <button className='btn btn-danger' onClick={() => this.decr()}>Decr</button>


        <div className="col-xs-2">
          <CircularProgressbar percentage={this.state.count} strokeWidth={10}
                               initialAnimation={true}
                               textForPercentage={(percentage) => percentage === 100 ? `Done` : `${percentage}%`}/>
        </div>


        <button className='btn btn-danger' onClick={() => this.conv()}>Convert</button>
        <DataTableUsaZip usaZip={this.props.usaZip} loadingBar={this.props.loadingBar}/>
        <h1>Lent egy komponens</h1>

        <section>
          <div className="dropzone">
            <Dropzone
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onDrop={this.onDrop}>
              csv, xls, xlsx-et elfogad
            </Dropzone>
          </div>
          <aside>
            <h2>Accepted files</h2>
            <ul>
              {this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)}
            </ul>
            <h2>Rejected files</h2>
            <ul>
              {this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)}
            </ul>
          </aside>
        </section>

        <button className='btn btn-danger' onClick={() => this.processMyFiles(this.state.accepted)}>
          XLS -> JSON
        </button>

      </div>
    );
  }
}


// ezzel lehet rákapcsolódni a store-ra, és kinyerni belőle az állapotokat
function mapStateToProps(state) {
  return {
    usaZip: state.usaZip.usaZip.dataset,
    loadingBar: state.loadingBar,
  };
}


// ezzel érem el az action-öket
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUsaZip: fetchUsaZip,
    downloadXlsxFromDB: downloadXlsx,
  }, dispatch);
}

// ezzel a kiajánlással egy store-ral összekötött komponensem lesz (smart componenet) => container !!!!
export default connect(mapStateToProps, mapDispatchToProps)(ManyExample);

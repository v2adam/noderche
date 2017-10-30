import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  deleteHistorySearch,
  listHistorySearch
} from '../../../../services/FirstComplexExample/actions';

import HistoryList from './components/HistoryList'

// smart component, összeköttetésben áll a store-ral
class HistoryContainer extends Component {

  constructor() {
    super();
  }

  // leszedi a history-t
  componentDidMount() {
    this.props.listHistorySearch();
  }

  render() {
    return (
      <div className='container'>
        <HistoryList content={this.props.historyAddress}
                     removeElement={this.props.deleteHistorySearch}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { historyAddress: state.firstExample.historyAddress };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    listHistorySearch: listHistorySearch,
    deleteHistorySearch: deleteHistorySearch
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);

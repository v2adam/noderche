import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'semantic-ui-react';

import { listHistorySearch } from '../../actions/firstExample/firstExampleActions';

class HistoryAddress extends Component {

  constructor() {
    super();
  }

  // leszedi a history-t
  componentDidMount() {
    this.props.listHistorySearch();
  }

  // lista tartalmát betölti
  createList() {
    return <List>
      {this.props.historyAddress.map(one =>
        <List.Item key={one.searchId}>{one.address}</List.Item>)
      }
    </List>
  }

  render() {
    return (
      <div className='container'>
        {this.createList()}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return { historyAddress: state.firstExample.historyAddress };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ listHistorySearch: listHistorySearch }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryAddress);

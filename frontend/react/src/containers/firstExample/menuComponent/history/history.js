import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'semantic-ui-react';
import {
  deleteHistorySearch,
  listHistorySearch
} from '../../../../actions/firstExample/firstExampleActions';

class HistoryContainer extends Component {

  constructor() {
    super();
  }

  // leszedi a history-t
  componentDidMount() {
    this.props.listHistorySearch();
  }


  deleteItem(id) {
    this.props.deleteHistorySearch(id);
  }

  // lista tartalmát betölti
  createList() {
    return <List>
      {this.props.historyAddress.map(one =>
        <List.Item key={one._id}>{one.address}
          <button className='btn btn-danger' onClick={() => this.deleteItem(one._id)}>x</button>
        </List.Item>)
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
  return bindActionCreators({
    listHistorySearch: listHistorySearch,
    deleteHistorySearch: deleteHistorySearch
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);

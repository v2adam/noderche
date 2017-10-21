import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemExampleItems from './postListComponent';
import { listPosts } from '../../../../actions/firstExample/firstExampleActions';

class PostsContainer extends Component {

  constructor() {
    super();
  }

  componentDidMount() {
    this.props.listPosts();
  }


  historyItems() {
    return <ItemExampleItems content={this.props.myComments}/>;
  }

  render() {
    return (
      <div className='container'>
        {this.historyItems()}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return { myComments: state.firstExample.myComments };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ listPosts: listPosts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);

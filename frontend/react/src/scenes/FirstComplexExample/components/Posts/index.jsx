import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemExampleItems from './components/PostsList';
import {
  addPost,
  deletePost,
  listPosts
} from '../../../../services/FirstComplexExample/actions';
import PostArea from './components/PostsPost';

class PostsContainer extends Component {

  constructor() {
    super();
  }

  componentDidMount() {
    this.props.listPosts();
  }


  render() {
    return (
      <div className='container'>
        <ItemExampleItems content={this.props.myComments}
                          deletePost={this.props.deletePost}
                          currentUserId={this.props.currentUserId}/>
        <PostArea addPost={this.props.addPost}/>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    myComments: state.firstExample.myComments,
    currentUserId: state.currentUser.user.userId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    listPosts: listPosts,
    addPost: addPost,
    deletePost: deletePost
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);

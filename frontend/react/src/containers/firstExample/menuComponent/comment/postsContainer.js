import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemExampleItems from './postListComponent';
import { addPost, listPosts } from '../../../../actions/firstExample/firstExampleActions';
import PostArea from './postsAddComponent';

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
        <ItemExampleItems content={this.props.myComments}/>
        <PostArea addPost={this.props.addPost}/>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return { myComments: state.firstExample.myComments };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ listPosts: listPosts, addPost: addPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);

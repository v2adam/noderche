import React, { Component } from 'react';
import { Button, Form, TextArea } from 'semantic-ui-react';

class PostArea extends Component {

  state = {
    text: '',
  };

  handleChange = (e, { name, value }) => this.setState({ text: value });

  handleSubmit = (e) => {
    this.props.addPost(this.state);
    this.setState({ text: '' });
  };


  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <TextArea autoHeight placeholder='Post something' rows={2} value={this.state.text}
                  onChange={this.handleChange}/>
        <Button content='Post' labelPosition='right' icon='edit' primary
                disabled={this.state.text === ''}
                type='submit'/>
      </Form>
    );
  }

}

export default PostArea;



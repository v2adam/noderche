import React, {Component} from 'react';


export class LastDeletedUserPanel extends Component {

  render() {
    if (!this.props.user.id) {
      return (
        <div>
          <h3>Még nem töröltél user-t</h3>
        </div>
      );
    }
    return (
      <div>
        <h3>Utoljára törölt user: {this.props.user.name}</h3>
      </div>
    );
  }
}
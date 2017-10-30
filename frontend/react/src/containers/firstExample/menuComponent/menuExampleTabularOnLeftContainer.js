import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import SearchAddress from './search/search';
import HistoryContainer from './history/history';
import PostsContainer from './comment/postsContainer';

// ennek a componentnek-nek az a dolga, hogy a kiválasztott menü tartalmát megjeleníti
export default class MenuExampleTabularOnLeft extends Component {

  // a belső állapota egyszerű, csak az UI állapota
  state = {
    activeItem: 'search'
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });


  render() {
    const { activeItem } = this.state;

    // activeItem alapján rakja be a tartalmat
    let content = null;
    switch (activeItem) {
      case 'search':
        content = <SearchAddress/>;
        break;

      case 'history':
        content = <HistoryContainer/>;
        break;

      case 'posts':
        content = <PostsContainer/>;
        break;

      default:
        content = <h4>Nincs itt semmi</h4>;
        break;

    }


    return (
      <Grid>
        <Grid.Column width={2}>
          <Menu fluid vertical tabular>
            <Menu.Item name='search' active={activeItem === 'search'}
                       onClick={this.handleItemClick}/>
            <Menu.Item name='history' active={activeItem === 'history'}
                       onClick={this.handleItemClick}/>
            <Menu.Item name='posts' active={activeItem === 'posts'}
                       onClick={this.handleItemClick}/>

          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={14}>
          <Segment>
            Active: {activeItem}
            {content}
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

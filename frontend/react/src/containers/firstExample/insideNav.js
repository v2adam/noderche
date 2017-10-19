import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import About from '../../components/about';
import SearchAddress from './searchAddress';

export default class MenuExampleTabularOnLeft extends Component {
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

      case 'about':
        content = <About/>;
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
            <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick}/>
            <Menu.Item name='companies' active={activeItem === 'companies'}
                       onClick={this.handleItemClick}/>
            <Menu.Item name='links' active={activeItem === 'links'} onClick={this.handleItemClick}/>
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

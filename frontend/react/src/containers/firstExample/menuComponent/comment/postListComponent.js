import React from 'react';
import { Button, Item } from 'semantic-ui-react';

// dummy, props-okat kap, és azt jeleníti meg
const ItemExampleItems = (props) => (

  <Item.Group>
    {props.content.forEach(one =>
      <Item key={one._id}>
        <Item.Image size='tiny'
                    src={one.imageUrl === undefined ? 'https://upload.wikimedia.org/wikipedia/commons/0/09/Dummy_flag.png' : one.imageUrl}/>
        <Item.Content>
          <Item.Header as='a'>{one._user.username}</Item.Header>
          <Item.Meta>{one.created_ts}</Item.Meta>
          <Item.Description>
            {one.text}
          </Item.Description>
          <Item.Extra>{one.tags}</Item.Extra>
        </Item.Content>
        {props.currentUserId === one._user.userId ?
          <Button color='red' onClick={() => props.deletePost(one._id)}>x</Button> : <div/>}
      </Item>
    )}
  </Item.Group>

);

export default ItemExampleItems;

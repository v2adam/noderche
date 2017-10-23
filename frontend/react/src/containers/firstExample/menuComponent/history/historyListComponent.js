import React from 'react';
import { List } from 'semantic-ui-react';

// dumb component, prop-okat kap, és azokat hajtja végre
const HistoryList = (props) => (

  <List>
    {props.content.map(one =>
      <List.Item key={one._id}>{one.address}
        <button className='btn btn-danger' onClick={() => props.removeElement(one._id)}>x</button>
      </List.Item>
    )}
  </List>

);

export default HistoryList;
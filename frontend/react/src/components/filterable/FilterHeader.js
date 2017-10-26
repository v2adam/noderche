import React, { Component } from 'react';
import { Filter } from "./Filter";

export class FilterHeader extends Component {

  render() {
    return (
      <div>
        <Filter id={1} type={'TEXT'} label={'Név'}/>
        <Filter id={2} label={'Csak az első'}/>
      </div>
    );
  }
}
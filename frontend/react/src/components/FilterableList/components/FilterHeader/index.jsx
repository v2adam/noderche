import React, { Component } from 'react';
import { Filter } from "./components/Filter";


//A szűrők fejléce
export default class FilterHeader extends Component {

  render() {
    const filters = [];
    //Megkapja prop-ban a szűrőket, és mindegyikhez csinál egy Filtert
    this.props.filters.forEach((filter) => {
      filters.push(
        <Filter id={filter.id} type={filter.type}
                label={filter.label} key={filter.id}
                handleChange={filter.handleChange}/>
      );
    });
    return (
      <form>
        {filters}
      </form>
    );
  }
}
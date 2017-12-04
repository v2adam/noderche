import React, { Component } from 'react';

//Egy szűrő
export class Filter extends Component {

  constructor(props) {
    super(props);
    //Változáskezelő függvények bindolása
    this.textChangeHandler = this.textChangeHandler.bind(this);
    this.checkboxChangeHandler = this.checkboxChangeHandler.bind(this);
  }

  render() {
    const filterValue = this.getFilterComponentFromType();
    return (
      <div>
        {this.props.label} : {filterValue}
      </div>
    );
  }

  //A típus alapján megfelelő input generálása
  getFilterComponentFromType() {
    if (this.props.type === "TEXT")
      return <input type="text" onChange={this.textChangeHandler}/>
    else
      return <input type="checkbox" name={this.props.id} checked={this.props.value}
                    onChange={this.checkboxChangeHandler}/>
  }

  //szöveges mezőnél a target.value tárolja a beírt értéket
  textChangeHandler(e) {
    this.props.handleChange(this.props.id, e.target.value);
  }

  //checkboxnál a target.checked tárolja, hogy ki van-e jelölve a négyzet
  checkboxChangeHandler(e) {
    this.props.handleChange(this.props.id, e.target.checked);
  }
}
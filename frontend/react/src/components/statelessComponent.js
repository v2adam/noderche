import React from 'react';


// ha nem kell állapotot tárolni, akkor elég ez
export default function CommentDisplay(props) {

  return <div>
    <div><h1>Ez lesz a stateless komponmens {props.valami}</h1></div>
  </div>
}



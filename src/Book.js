import React from 'react';
import MenuSelect from './MenuSelect';

export default function Book (props){
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={props.cover}></div>
          <div className="book-shelf-changer">
            <MenuSelect />
          </div>
        </div>
        <div className="book-title">{props.title}</div>
        <div className="book-authors">{props.author}</div>
      </div>
    </li>
  )
}

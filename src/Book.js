import React from 'react';
import MenuSelect from './MenuSelect';

export default class Book extends React.Component{
  render(){
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={this.props.cover}></div>
            <div className="book-shelf-changer">
              <MenuSelect />
            </div>
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.author}</div>
        </div>
      </li>
    )
  }
}

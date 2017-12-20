import React from 'react';
import Book from './Book'

export default class Shelf extends React.Component{
  render(){
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf}</h2>
        <div className="bookshelf-books">
          <Book />
        </div>
      </div>
    )
  }
}

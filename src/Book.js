import React from 'react';
import defaultbook from './icons/defaultbook.png'

function Book (props){

  let coverStyle ={
    width: 128,
    height: 193,
    backgroundImage: `url("${defaultbook}")`
  }

  if (props.book.imageLinks) {
    coverStyle.backgroundImage = `url("${props.book.imageLinks.smallThumbnail}")`
  }

  let authors = props.book.authors

  if (props.book.authors.length === 0){
    authors = 'Author not informed'
  } else if (props.book.authors.length > 0){
    authors = authors.join(', ')
  }

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <a href={props.book.infoLink} target="_blank">
            <div className="book-cover" style={coverStyle}></div>
          </a>
          <div className="book-shelf-changer">
            <select value={props.book.shelf ? props.book.shelf : "nothing"} onChange={(event) => props.changeShelf(props.book.id, event.target.value, props.book)}>
              <option value="nothing" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    </li>
  )
}

export default Book

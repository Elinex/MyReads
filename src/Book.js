import React from 'react';

function Book (props){

  const coverStyle ={
    width: 128,
    height: 193,
    backgroundImage: `url("${props.book.imageLinks.smallThumbnail}")`
  }

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={coverStyle}></div>

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
        <div className="book-authors">{props.book.authors}</div>
      </div>
    </li>
  )
}

export default Book

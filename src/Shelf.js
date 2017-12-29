import React from 'react';
import Book from './Book'

function Shelf (props){
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(book => (
            <Book
              book={book}
              key={book.id}
              changeShelf={props.changeShelf}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Shelf

// export default class Shelf extends React.Component{

//
//   render(){
//
//     return (
//       <div className="bookshelf">
//         <h2 className="bookshelf-title">{this.props.shelfName}</h2>
//         <div className="bookshelf-books">
//           <ol className="books-grid">
//             {this.state.books.map(book => {
//               if (book.shelf === this.props.shelfName){
//                 return (
//                   <Book
//                     key={book.id}
//                     cover={book.bookCover}
//                     title={book.bookTitle}
//                     author={book.bookAuthor}
//                   />
//                 )
//               } else {
//                 return null
//               }
//             })}
//           </ol>
//         </div>
//       </div>
//     )
//   }
// }

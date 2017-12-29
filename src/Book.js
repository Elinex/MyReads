import React from 'react';

function Book (props){
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={props.book.bookCover}></div>
          <div className="book-shelf-changer">
            <select value={props.book.shelf} onChange={(event) => props.changeShelf(props.book.id, event.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="Currently Reading">Currently Reading</option>
              <option value="Want to Read">Want to Read</option>
              <option value="Read">Read</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.book.bookTitle}</div>
        <div className="book-authors">{props.book.bookAuthor}</div>
      </div>
    </li>
  )
}

export default Book

// export default class Book extends React.Component{
//   state = {
//       shelf: "None"
//   }
//
//   handleChangeShelf = (e) => {
//     this.setState({
//       shelf: e.target.value
//     })
//     console.log(this.state, e.target.value)
//   }
//
//   render(){
//     return (
//       <li>
//         <div className="book">
//           <div className="book-top">
//             <div className="book-cover" style={this.props.cover}></div>
//             <div className="book-shelf-changer">
//               <select onClick={(e) => this.handleChangeShelf(e)}>
//                 <option value="none" disabled>Move to...</option>
//                 <option value="Currently Reading">Currently Reading</option>
//                 <option value="Want to Read">Want to Read</option>
//                 <option value="Read">Read</option>
//                 <option value="None">None</option>
//               </select>
//             </div>
//           </div>
//           <div className="book-title">{this.props.title}</div>
//           <div className="book-authors">{this.props.author}</div>
//         </div>
//       </li>
//     )
//   }
// }

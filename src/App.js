import React from 'react'
import './App.css'
import Shelf from './Shelf'
import * as BooksAPI from './BooksAPI'
import BooksToSearch from './BooksToSearch'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component{
  state = {
    shelves: [
      ["currentlyReading", "Currently Reading"],
      ["wantToRead", "Want to Read"],
      ["read", "Read"]
    ],
    books: []
  }

  // Actualize the property shelf of all books when menu selection is clicked
  // idBookClicked means "props.book.id" -> the id of clicked book from Book component
  // newShelf means "event.target.value" -> the shelf choiced in the menu selection inside Book component
  // bookClicked means "props.book" -> the cliked book from Book component
  handleChangeShelf = (idBookClicked, newShelf, bookClicked ) => {
    let bookAlreadyExists = this.state.books.filter(book => (book.id === idBookClicked))
    if (bookAlreadyExists.length === 0) {
      this.setState( state => {
        bookClicked.shelf = newShelf
        state.books.push(bookClicked)
        return { books: state.books }
      })
    } else {
      this.changeShelfBooks(idBookClicked, newShelf)
    }
    BooksAPI.update(idBookClicked, newShelf).then( res => {
      if ((newShelf.search("none") === 0) || (idBookClicked === undefined)){
        console.log("newShelf is ", newShelf, "and idBookClicked is ", idBookClicked);
        return null
      } else {
        console.log(res, this.state.books);
        return res
      }
    })
  }

  // Change property shelf of books already exists in this.state.books
  // This function is just used in the "handleChangeShelf" function
  changeShelfBooks = (bookClicked, newShelf) => {
    this.setState((state) => {
      let books = state.books.map(book => {
        if (book.id === bookClicked) {
          book.shelf = newShelf
        }
        return book
      })
      return { books: books };
    })
  }

  componentDidMount (){
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books
      })
    })
  }

  // ### `update`
  // Method Signature:
  // * book: `<Object>` containing at minimum an `id` attribute
  // * shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
  // * Returns a Promise which resolves to a JSON object containing the response data of the POST request
  // onChange={(event) => props.changeShelf(props.book.id, event.target.value, props.book)}
  // updateBooks = (idBookClicked, newShelf) => {
  //   BooksAPI.update(idBookClicked, newShelf).then( res => {
  //     if ((newShelf.search("none") === 0) || (idBookClicked === undefined)){
  //       console.log("newShelf is ", newShelf, "and idBookClicked is ", idBookClicked);
  //       return null
  //     } else {
  //       console.log(res);
  //       return res
  //     }
  //   })
  // }



  render(){

    let { shelves, books } = this.state

    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <BooksToSearch
            changePage={this.changeSearchPage}
            changeShelf={this.handleChangeShelf}
          />
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {shelves.map(shelf => (
                <Shelf
                  shelfName={shelf[1]}
                  key={shelf[0]}
                  books={books.filter(book => shelf[0] === book.shelf)}
                  changeShelf={this.handleChangeShelf}
                />
              ))}
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp

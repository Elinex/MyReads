import React, {Component} from 'react'
import './App.css'
import Shelf from './Shelf'
import * as BooksAPI from './BooksAPI'
import BooksToSearch from './BooksToSearch'

class BooksApp extends Component{
  state = {
    showSearchPage: false,
    shelves: [
      ["currentlyReading", "Currently Reading"],
      ["wantToRead", "Want to Read"],
      ["read", "Read"]
    ],
    books: []
  }

  handleChangeShelf = (idBookClicked, newShelf, bookClicked ) => {
    let a = this.state.books.filter(book => (book.id === idBookClicked))
    if (a.length === 0) {
      this.setState( state => {
        bookClicked.shelf = newShelf
        state.books.push(bookClicked)
        return { books: state.books }
      })
    } else {
      this.changeShelfTest(idBookClicked, newShelf)
    }
  }

  changeShelfTest = (bookClicked, newShelf) => {
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

  changeSearchPage = () => {
    this.setState({
      showSearchPage: false
    })
  }

  render(){

    let { shelves, books } = this.state

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BooksToSearch
            changePage={this.changeSearchPage}
            changeShelf={this.handleChangeShelf}
          />
        ) : (
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp

import React from 'react'
import './App.css'
import Shelf from './Shelf'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component{
  state = {
    showSearchPage: false,
    query: '',
    shelves: [
      ["currentlyReading", "Currently Reading"],
      ["wantToRead", "Want to Read"],
      ["read", "Read"],
      ["none", "None"]
    ],
    books: []
  }

  // mudar a prateleira:
  //   input: livro clicado e prateleira clicada
  //   output: retornar um novo do estado do componente com a prateleira do livro clicado
  //   o que vai ser feito: iterar por todos os livros que estão no state e checar qual foi clicado; trocar a prateleira do livro de acordo com o valor clicado

  handleChangeShelf = (bookClicked, newShelf) => {
    this.setState((state) => {
      let books = state.books.map(book => {
        if (book.id === bookClicked) {
          book.shelf = newShelf
        }
        return book
      })
      console.log(books);
      return { books: books };
    })
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
  }

  componentDidMount (){
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books
      })
    })
  }

  render(){

    let { query, shelves, books } = this.state

    let showBooks
    if (query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showBooks = books.filter(book => (match.test(book.title) || match.test(book.authors)))
    } else {
      showBooks = books
    }
    showBooks.sort(sortBy('title', 'authors'))

    let quantityBooks
    if (showBooks.length > 1){
      quantityBooks = "books"
    } else {
      quantityBooks = "book"
    }

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <div>
                {((showBooks.length !== books.length) && showBooks.length > 0) && (
                  <div>
                    Found {showBooks.length} {quantityBooks}
                  </div>
                )}
                {(showBooks.length === 0) && (
                  <div>
                    No book found
                  </div>
                )}
              </div>
              <ol className="books-grid">
                {showBooks.map(book => {
                  return (
                  <Book
                    key={book.id}
                    book={book}
                  />)
                })}
              </ol>
            </div>
          </div>
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

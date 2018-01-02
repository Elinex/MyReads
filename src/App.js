import React from 'react'
import './App.css'
import Shelf from './Shelf'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
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
    books: [],
    booksSearched: []
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
          console.log(book)
        } else {
          book.shelf = newShelf
          this.state.books.push(book)
          console.log(book)
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
    this.searchBooks(this.state.query, 20)
  }

  searchBooks = (query, maxResults) => {
    BooksAPI.search(query, maxResults).then( res => {
      console.log(res)
      if (Array.isArray(res)){
        this.setState({
          booksSearched: res
        })
      } else {
        console.log("Oh shit :", res.error );
      }
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

    let { query, shelves, books, booksSearched } = this.state

    // let booksSearched
    // if (query){
    //   const match = new RegExp(escapeRegExp(query), 'i')
    //   booksSearched = books.filter(book => (match.test(book.title) || match.test(book.authors)))
    // } else {
    //   booksSearched = books
    // }
    // booksSearched.sort(sortBy('title', 'authors'))

    let quantityBooks
    if (booksSearched.length > 1){
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
                {(booksSearched.length > 0) && (
                  <div>
                    Found {booksSearched.length} {quantityBooks}
                  </div>
                )}
                {(booksSearched.length === 0) && (
                  <div>
                    No book found
                  </div>
                )}
              </div>
              <ol className="books-grid">
                {booksSearched.map(book => {
                  return (
                  <Book
                    key={book.id}
                    book={book}
                    changeShelf={this.handleChangeShelf}
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

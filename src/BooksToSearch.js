import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'

class BooksToSearch extends React.Component{
  state = {
    query: '',
    booksAPIsearch: []
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    })
    BooksAPI.search(query.trim(), 20).then(res => {
      if (Array.isArray(res)){
        res.map(data => {
          const foundBook = this.props.books.find(book => (book.id === data.id))
          if (foundBook !== undefined){
            data.shelf = foundBook.shelf
          }
          return data
        })
        this.setState({
          booksAPIsearch: res
        })
      } else {
        this.setState({
          booksAPIsearch: []
        })
      }
    })
  }

  render(){

    let { booksAPIsearch } = this.state

    let quantityBooks
    if (booksAPIsearch.length > 1){
      quantityBooks = "books"
    } else {
      quantityBooks = "book"
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="400" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                // value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <div>
            {(booksAPIsearch.length > 0) && (
              <div>
                Found {booksAPIsearch.length} {quantityBooks}
              </div>
            )}
            {(booksAPIsearch.length === 0) && (
              <div className="bookshelf-books">
                <h2>"Livros não mudam o mundo, quem muda o mundo são as pessoas. Os livros só mudam as pessoas!"</h2>
                <h3>Mari Quintana</h3>
                <h1>Let\'s put your readings in order!</h1>
              </div>
            )}
          </div>
          <ol className="books-grid">
            {booksAPIsearch.map(book => {
              return (
              <Book
                key={book.id}
                book={book}
                changeShelf={this.props.changeShelf}
              />)
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default BooksToSearch

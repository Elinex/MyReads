import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'

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
        this.setState({
          booksAPIsearch: res
        })
      }
    })
  }

  render(){

    let { query, booksAPIsearch } = this.state

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
            {(booksAPIsearch.length > 0) && (
              <div>
                Found {booksAPIsearch.length} {quantityBooks}
              </div>
            )}
            {(booksAPIsearch.length === 0) && (
              <div className="bookshelf-books">
                <h3>"Livros não mudam o mundo, quem muda o mundo são as pessoas. Os livros só mudam as pessoas!"</h3>
                <p>Mario Quintana</p>
                <h2>Let's put your readings in order!</h2>
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

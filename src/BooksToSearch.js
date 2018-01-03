import React from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BooksToSearch extends React.Component{
  state = {
    query: '',
    booksAPIsearch: []
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
    BooksAPI.search(query.trim(), 20).then(res => {
      if (Array.isArray(res)){
        this.setState({
          booksAPIsearch: res
        })
      } else {
        console.log(res.error)
      }
    })
  }

  render(){

    let { query, booksAPIsearch } = this.state

    let showBooks
    if (query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showBooks = booksAPIsearch.filter(book => (match.test(book.title) || match.test(book.authors)))
    } else {
      showBooks = booksAPIsearch
    }
    showBooks.sort(sortBy('title', 'authors'))

    let quantityBooks
    if (showBooks.length > 1){
      quantityBooks = "books"
    } else {
      quantityBooks = "book"
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.props.changePage()}>Close</a>
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
            {(showBooks.length > 0) && (
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

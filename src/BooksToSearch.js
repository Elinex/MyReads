import React from 'react'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BooksToSearch extends React.Component{
  state = {
    query: '',
    booksAPIsearch: []
  }

  componentDidMount (){
    console.log('mounting', this.state)
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
    BooksAPI.search(query.trim(), 20).then(res => {
      console.log(res);
      if (Array.isArray(res)){
        this.setState({
          booksAPIsearch: res
        })
      } else {
        console.log(res)
        // return null
      }
      console.log(this.state.booksAPIsearch);
    })
  }

  render(){

    let { query, booksAPIsearch } = this.state

    // let showBooks
    // if (query){
    //   const match = new RegExp(escapeRegExp(query), 'i')
    //   showBooks = booksAPIsearch.filter(book => (match.test(book.title) || match.test(book.authors)))
    // } else {
    //   showBooks = booksAPIsearch
    // }
    // showBooks.sort(sortBy('title', 'authors'))
    //
    let quantityBooks
    if (booksAPIsearch.length > 1){
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

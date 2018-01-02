import React from 'react'
import './App.css'
import Shelf from './Shelf'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Book from './Book'

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
    books: [
      {
        id: 1,
        bookTitle: "To Kill a Mockingbird",
        bookAuthor: "Harper Lee",
        bookCover: {
          width: 128,
          height: 193,
          backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")'
        },
        shelf: "Currently Reading"
      },
      {
        id: 2,
        bookTitle: "Ender's Game",
        bookAuthor: "Orson Scott Card",
        bookCover: {
          width: 128,
          height: 193,
          backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")'
        },
        shelf: "Want to Read"
      },
      {
        id: 3,
        bookTitle: "1776",
        bookAuthor: "David McCullough",
        bookCover: {
          width: 128,
          height: 193,
          backgroundImage: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")'
        },
        shelf: "Read"
      },
      {
        id: 4,
        bookTitle: "1776",
        bookAuthor: "David McCullough",
        bookCover: {
          width: 128,
          height: 193,
          backgroundImage: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")'
        },
        shelf: "Read"
      }
    ]
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

  render(){

    let { query, shelves, books } = this.state

    let showBooks
    if (query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showBooks = books.filter(book => (match.test(book.bookTitle) || match.test(book.bookAuthor)))
    } else {
      showBooks = books
    }
    showBooks.sort(sortBy('bookTitle', 'bookAuthor'))

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
                  books={books.filter(book => shelf[1] === book.shelf)}
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

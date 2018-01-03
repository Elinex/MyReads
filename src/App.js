import React from 'react'
import './App.css'
import Shelf from './Shelf'
import * as BooksAPI from './BooksAPI'
import BooksToSearch from './BooksToSearch'

class BooksApp extends React.Component{
  state = {
    showSearchPage: false,
    shelves: [
      ["currentlyReading", "Currently Reading"],
      ["wantToRead", "Want to Read"],
      ["read", "Read"],
      ["none", "None"]
    ],
    books: []
  }

  handleChangeShelf = (idBookClicked, newShelf, bookClicked ) => {
    let a = this.state.books.filter(book => (book.id === idBookClicked))
    if (a.length === 0) {
      this.setState( state => {
        bookClicked.shelf = newShelf
        state.books.push(bookClicked)
        console.log(state.books);
        return { books: state.books }
      })
    } else {
      this.changeShelfTest(idBookClicked, newShelf)
    }
    console.log((a), this.state.books);
  }

  // bookClicked é o id do livro clicado
  // newShelf é a prateleira selecionada do livro clicado
  // a função handleChangeShelf retorna o novo estado de "books" da seguinte forma:
  // changeShelfTest = (bookClicked, newShelf) => {
  //   // chama a função setState e usa como parâmetro o state atual que será atualizado
  //   this.setState((state) => {
  //     // itera por todos os itens da array state.books
  //     let books = state.books.map(book => {
  //       // se o id do livro que pertence ao atual state for igual ao id do livro clicado
  //       if (book.id === bookClicked) {
  //         // a função altera a shelf do livro que está no state para o novo valor "newShelf"
  //         book.shelf = newShelf
  //       }
  //       // e retorna o livro com o novo valor de shelf ou não
  //       return book
  //     })
  //     // a função retorna um objeto com uma chave "books" e valor com a lista de livros atualizada
  //     return { books: books };
  //   })
  // }


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

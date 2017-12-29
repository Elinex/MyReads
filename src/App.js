import React from 'react';
import './App.css';
import Shelf from './Shelf'

class BooksApp extends React.Component{
  state = {
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

  render(){
    return (
      <div>
        {
          this.state.shelves.map(shelf => (
            <Shelf
              shelfName={shelf[1]}
              key={shelf[0]}
              books={this.state.books.filter(book => shelf[1] === book.shelf)}
              changeShelf={this.handleChangeShelf}
            />
          ))
        }
      </div>
    )
  }
}

export default BooksApp

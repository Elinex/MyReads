import React from 'react';
import Book from './Book'

export default class Shelf extends React.Component{
  render(){
    const library = [
      {
        id: 1,
        bookTitle: "To Kill a Mockingbird",
        bookAuthor: "Harper Lee",
        bookCover: {
          width: 128,
          height: 193,
          backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")'
        }
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
      },
      {
        id: 3,
        bookTitle: "1776",
        bookAuthor: "David McCullough",
        bookCover: {
          width: 128,
          height: 193,
          backgroundImage: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")'
        }
      }
    ];

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {library.map(book =>
              (<Book
                key={book.id}
                cover={book.bookCover}
                title={book.bookTitle}
                author={book.bookAuthor}
              />)
            )}
          </ol>
        </div>
      </div>
    )
  }
}

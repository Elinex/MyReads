import React from 'react';
import './App.css';
import Shelf from './Shelf'

class BooksApp extends React.Component{

  render(){
    return (
      <div>
        <Shelf shelfName="Currently Reading"/>
        <Shelf shelfName="Want to Read"/>
        <Shelf shelfName="Read"/>
      </div>
    )
  }
}

export default BooksApp

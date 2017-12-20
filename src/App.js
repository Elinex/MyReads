import React from 'react';
import './App.css';
import Shelf from './Shelf'

class BooksApp extends React.Component{
  render(){
    return (
      <div>
          <Shelf shelf="Currently Reading"/>
          <Shelf shelf="Want to Read"/>
          <Shelf shelf="Read"/>
        </div>
    )
  }
}

export default BooksApp

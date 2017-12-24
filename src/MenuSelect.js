import React from 'react';

export default class MenuSelect extends React.Component{
  state = {
    none: "None",
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read"
  }
  handleClick = () => {
      console.log('this is: ', this);
  }
  render(){

    return (
      <select onClick={this.handleClick}>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    )
  }
}

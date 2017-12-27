import React from 'react';

export default class Book extends React.Component{
  // state = {
  //     shelf: "None"
  // }

  // handleChangeShelf = (e) => {
  //   this.setState({
  //     shelf: e.target.value
  //   })
  //   console.log(this.state, e.target.value)
  // }

  render(){
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={this.props.cover}></div>
            <div className="book-shelf-changer">
              <select onClick={(e) => this.handleChangeShelf(e)}>
                <option value="none" disabled>Move to...</option>
                <option value="Currently Reading">Currently Reading</option>
                <option value="Want to Read">Want to Read</option>
                <option value="Read">Read</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.author}</div>
        </div>
      </li>
    )
  }
}

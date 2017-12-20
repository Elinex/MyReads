import React from 'react';

// export default class MenuSelect extends React.Component{
//   render(){
//     return (<select>
//       <option value="none" disabled>Move to...</option>
//       <option value="currentlyReading">Currently Reading</option>
//       <option value="wantToRead">Want to Read</option>
//       <option value="read">Read</option>
//       <option value="none">None</option>
//     </select>)
//   }
// }

export default function MenuSelect (props){
  return (
    <select>
      <option value="none" disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  )
}

// If this component only has a render method, this can be written as stateless functional component (uses less memory and js resources),
// like this one:
  // function User(props){
  //  return <p>Username: {props.username}</p>
  // }

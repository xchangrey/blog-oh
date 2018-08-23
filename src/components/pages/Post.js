import React, { Component } from 'react'

class Post extends Component {

  state = {
    currentUserName: '',
    currentUserEmail: ''
  }

  componentDidMount(){
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    this.setState({
      currentUserEmail: idToken.idToken.claims.email,
      currentUserName: idToken.idToken.claims.name
    });
  }
  render() {
    const { currentUserEmail, currentUserName } = this.state;
    return (
      <div>
        <h1>Welcome { currentUserName }</h1>
        <p>You have reached the point of no return!</p>
      </div>
    )
  }
}

export default Post;

import React, { Component } from 'react'

class Post extends Component {

  state = {
    currentUserName: '',
    currentUserEmail: '',
    posts: []
  }

  getPosts = () => {
    fetch('https://xchanrey-blog-api.herokuapp.com/posts')
      .then(res => res.json())
      .then(data => data.map(post => (
        {
          id: `${post.id}`,
          title: `${post.title}`,
          body: `${post.body}`
        }

      )))
      .then(posts => this.setState({
        posts
      }))
      .catch(err => console(err))
  }

  componentDidMount(){
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    this.setState({
      currentUserEmail: idToken.idToken.claims.email,
      currentUserName: idToken.idToken.claims.name,
    });

    this.getPosts();
  }
  render() {
    const { currentUserName, posts } = this.state;
    return (
      <div>
        <h1>Welcome { currentUserName }</h1>
        <p>You have reached the point of no return!</p>
        <div>
          {posts.map(({id, title, body}) => {
            return(
              <div className="card" key={id}>
                <div className="card-body">
                  <h2>{title}</h2>
                  <p>{body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Post;

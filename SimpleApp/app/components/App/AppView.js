// NOTE * Only 1 file (this file) is used for the entire webapp
// 
// OTHER NOTE
// * Web invented 1989
// * Android (by Google) invented 2003 (14 years after Web)
// * iOS (from Apple) invented ~ 2007 (~ 18 years after Web)
// * ReactJS for Web (from Facebook) invented 2013 (24 years after Web)
// * React-Native for Mobile (from Facebook) invented 2015 (26 years after Web)
//
// Thus, Web technologies are 20+ years ahead of Mobile technologies.
// Using ReactJS for Web, is easier since it is 6+ years old as of 2019.
// React-Native for Mobile is only ~ 4 years old and will always be behind Web.

// **********************************************************************************************

import React, { Component } from 'react'; // og.note: maybe needed due to React.Component
import ReactDOM from 'react-dom'; // og.note: was needed for webapp (not for mobile)

import * as CONSTANTS from '../../common/constants';
import * as serviceWorker from '../../web/serviceWorker';
import '../../web/css/styles.css'; // og.note: is copied to public/css during build process

import firebase, { auth, provider } from '../../common/firebase'; 

class AppView extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  login() {
    auth.signInWithPopup(provider) // The signInWithPopup() method doesn't work with React Native
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }
  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.user.displayName || this.state.user.email
    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: ''
    });
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }
  render() {
    return (
      <div className='app'>
        <header>
            <div className="wrapper">
              <h1>{CONSTANTS.TEXT_LOGO_TYPE}</h1>
              {this.state.user ?
                <button class="logoutButton" style={{marginRight:'50px'}} onClick={this.logout}>{CONSTANTS.PAGE_3_LINK}</button>     
              :
                <img style={{marginTop:'-5px', marginRight:'50px'}} alt="LOGIN" onClick={this.login} src="https://storage.googleapis.com/gcs.hostbin.co/public/images/google_login.png" />             
              }
            </div>
        </header>
        {this.state.user ?
          <div>
            <div className='container'>
              <section className='add-item'>
                    <form onSubmit={this.handleSubmit}>
                      <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.user.displayName || this.state.user.email} />
                      <input type="text" name="currentItem" placeholder={CONSTANTS.TEXT_FOOD} onChange={this.handleChange} value={this.state.currentItem} />
                      <button>{CONSTANTS.TEXT_ENTER}</button>
                    </form>
              </section>

              <section className='display-item'>
                  <div className="wrapper">
                    <ul>
                      {this.state.items.map((item) => {
                        return (
                          <li key={item.id}>
                            <h3>Food: {item.title}</h3>
                            <p>Brought by: {item.user}
                              {item.user === this.state.user.displayName || item.user === this.state.user.email ?
                                <button style={{marginLeft:'-3px'}} onClick={() => this.removeItem(item.id)}>Remove</button>
                              : null}
                            </p>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
              </section>
            </div>
          </div>
        : 
          <p> </p>
        }
        
      </div>
    );
  }
}
export default AppView;

ReactDOM.render(<AppView />, document.getElementById('root'));

/// If you want the app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

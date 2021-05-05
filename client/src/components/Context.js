import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';


const Context = React.createContext(); 

export class Provider extends Component {

  //new data() imports all the functions of and data from component Data
  constructor() {
      super();
      this.data = new Data();
  }

  state = {
      authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  render() {
      const { authenticatedUser } = this.state;

      const value = {
      authenticatedUser,
      data: this.data,
      actions: {
          signIn: this.signIn,
          signOut: this.signOut
      }}

      return (
        <Context.Provider value={value}>
        {this.props.children}
        </Context.Provider>  
      );
  }

  // function let's user sign in based on emailaddress and password. Sets a cookie so data is stored even when page refreshes
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      user.password = password
      this.setState(() => {
        return {
          authenticatedUser: user,
        }
      });
      // Set cookie. 
      // Expires: 1 means the cookie expires after 1 day
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1}); 
    } 
    return user;
  }
  
  // Signs user out and removes cookie
  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

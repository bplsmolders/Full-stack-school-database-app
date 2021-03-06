import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Form from './Form'


export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    // rendor method passes all elements and functions down to the Form Component
    render(){
        const {
            emailAddress,
            password,
            errors,
        } = this.state;
    
        return(
            <div className="form--centered">
                <h2>Sign In</h2>
                <Form 
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Sign In"
                    elements={
                    <React.Fragment>
                        <label>Email Adress
                            <input 
                                id="emailAddress" 
                                name="emailAddress" 
                                type="text"
                                value={emailAddress} 
                                onChange={this.change} />
                        </label>
                        <label>Password
                        <input 
                            id="password" 
                            name="password"
                            type="password"
                            value={password} 
                            onChange={this.change} />
                        </label>                
                    </React.Fragment>
                } />
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
            </div>
        )
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
    }
    
    submit = () => {
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { emailAddress, password } = this.state;
        
        //GET FETCH based on the global function signIn (see Context.js)
        context.actions.signIn(emailAddress, password)
          .then( user => {
            if (user === null) {
              this.setState(() => {
                return { errors: [ 'Sign-in was unsuccessful' ] };
              });
            } else {
              this.props.history.push(from);
              console.log(`SUCCESS! ${emailAddress} is now signed in!`);
           }
          })
          .catch( err => {
              console.log(err);
              this.props.history.push('/error');
          })
    }
    
    // Redirects user to homepage when cancel button is clicked
    cancel = () => {
        this.props.history.push('/');
    }
    
}
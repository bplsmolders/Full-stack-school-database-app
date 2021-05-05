import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Form from './Form'



export default class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: []
      }
    
    // rendor method passes all elements and functions down to the Form Component
    render(){
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors,
        } = this.state;
      
        return(
            <div className="form--centered">
                <h2>Sign Up</h2>

                <Form 
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Sign Up"
                    elements={
                    <React.Fragment>
                        <label> First Name 
                            <input 
                            id="firstName" 
                            name="firstName" 
                            type="text"
                            value={firstName} 
                            onChange={this.change} />
                        </label>
                        <label>Last Name
                            <input 
                            id="lastName" 
                            name="lastName" 
                            type="text"
                            value={lastName} 
                            onChange={this.change} />
                        </label>
                        <label>Email Address
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
                        <label>Confirm Password
                            <input 
                            id="confirmPassword" 
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword} 
                            onChange={this.change}  />
                        </label>
                    </React.Fragment>
                } />

                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
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
        
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        } = this.state; 

        // New user payload
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        };

        //POST FETCH based on the global function createUsert (see Context.js)
        context.data.createUser(user)
        .then( errors => {
            if (errors.length) {
            this.setState({ errors });
            } else {
            context.actions.signIn(emailAddress, password)
                .then(() => {
                this.props.history.push('/'); 
                console.log('signed up!')   
                });
            }
        })
        .catch( err => { // handle rejected promises
            console.log(err);
            this.props.history.push('/error'); // push to history stack
        });     
    }
      
    cancel = () => {
        this.props.history.push('/');
    }
}

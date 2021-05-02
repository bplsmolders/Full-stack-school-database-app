import React, {Component} from 'react';
import {Link} from 'react-router-dom'



export default class UserSignUp extends Component {

    render(){
        return(
            <div class="form--centered">
                <h2>Sign Up</h2>
                
                <form>
                    <label>First Name
                        <input id="firstName" name="firstName" type="text" value="" />
                    </label>
                    <label for="lastName">Last Name
                        <input id="lastName" name="lastName" type="text" value="" />
                    </label>
                    <label >Email Address
                        <input id="emailAddress" name="emailAddress" type="email" value="" />
                    </label>
                    <label >Password
                        <input id="password" name="password" type="password" value="" />
                    </label>
                    <label for="confirmPassword">Confirm Password
                        <input id="confirmPassword" name="confirmPassword" type="password" value="" />
                    </label>    
                    <button class="button" type="submit">Sign Up</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        )
    }
}

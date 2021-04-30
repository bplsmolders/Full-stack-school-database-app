import React, {Component} from 'react';


export default class UserSignIn extends Component {

    render(){
        return(
            <div className="form--centered">
                <h2>Sign In</h2>
                
                <form>
                    <label>Email Address
                        <input id="emailAddress" name="emailAddress" type="email" value=""></input>
                    </label>
                    <label>Password
                        <input id="password" name="password" type="password" value=""></input>
                    </label>
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <a href="/signup">sign up</a>!</p>
            </div>
        )
    }
}

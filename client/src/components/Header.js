import React from 'react';
import { NavLink} from 'react-router-dom'

function Header (props) {
  const  authUser  = props.context.authenticatedUser;
  return (
    <header>
      <div className="wrap header--flex">
            <h1 className="header--logo"><a href="/">Courses</a></h1>
            <nav>
              {authUser ? (
                  <ul className="header--signedout">
                    <li>Welcome {`${authUser.firstName} ${authUser.lastName}`}!</li>
                    <li><NavLink to="/signout">Sign Out</NavLink></li>
                  </ul>
              ): (
                  <ul className="header--signedout">
                    <li><NavLink to="/signup">Sign Up</NavLink></li>
                    <li><NavLink to="/signin">Sign In</NavLink></li>
                  </ul>
              )}
            </nav>
        </div>
    </header>
  );
};

export default Header
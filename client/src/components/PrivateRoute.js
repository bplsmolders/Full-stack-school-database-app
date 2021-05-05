import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

// checks if the user is logged in, if not user will be redirected to /login
function PrivateRoute ({ component: Component, ...rest }) {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
              }} />
            )
          }
        />
    )}
    </Consumer>
  );
};

export default PrivateRoute
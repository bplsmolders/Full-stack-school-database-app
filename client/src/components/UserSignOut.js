import React from 'react';
import { Redirect } from 'react-router-dom';

// when signout button in header is clicked. User is signedout and redirected to the homepage
function UserSignout(props) {
    props.context.actions.signOut()

    return (
      <Redirect to="/" />
    );
}

export default UserSignout
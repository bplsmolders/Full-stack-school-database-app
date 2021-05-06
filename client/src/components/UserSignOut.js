import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom';

// when signout button in header is clicked. User is signedout and redirected to the homepage
function UserSignout(props) {
    useEffect(() => props.context.actions.signOut())

    return (
      <Redirect to="/" />
    );
}

export default UserSignout
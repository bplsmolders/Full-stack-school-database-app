import React from 'react';
import { Redirect } from 'react-router-dom';

 
function UserSignout(props) {
    props.context.actions.signOut()

    return (
      <Redirect to="/" />
    );
}

export default UserSignout
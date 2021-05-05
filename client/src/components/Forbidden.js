import React from 'react';
 
function Forbidden () {
    return (
    <div className="wrap">
        <h2>Forbidden</h2>
        <p>Sorry! This page can only be entered with the right account.</p>
        <a href='/'>Home</a>
    </div>
    );
}

export default Forbidden 
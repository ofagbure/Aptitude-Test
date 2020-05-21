import React from 'react';

function Progress(props) {
    return(
    
    <nav className="navbar navbar-light bg-light">
    <span className="navbar-brand mb-0 h1">Question {props.total} of {props.current}</span>
  </nav>
)}

export default Progress
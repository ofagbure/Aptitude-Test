import React from 'react';

function Question(props) {
    return(
    <div className="jumbotron">
        <h3 className="display-4"> {props.question} </h3>
    </div>
    )    
}

export default Question
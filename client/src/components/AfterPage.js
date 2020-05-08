import React from 'react'

function Complete(props) {
    return(
        <div>
            <h1> You have finshed with the test!</h1>
            <h3> Score {props.score} </h3>
        </div>
    )
}

export default Complete
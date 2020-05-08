import React from 'react'

function Answer(props) {
    
    let classes = ['answer'];

    if (props.selected) {
        classes.push('selected');
        }    
        return(
            <button value={props.numbers} className="btn btn-light btn-block" onClick={props.handleClick}>
                <span className="number"> {props.answer} </span>
            </button>
        )
    }

export default Answer


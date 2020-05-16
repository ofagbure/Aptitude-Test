import React from 'react'

function Button(props) {
    let colors = ['#e13254','#842176','#321293'];
    return (
        <button onClick={props.onclick}
        style={{
            margin: "5px",
            padding: ".375rem .75rem",
            border: "1px solid transparent",
            fontSize: "1rem",
            font: "inherit",
            position: "initial",
            transform: "none",
            borderRadius: ".25rem",
            top: "initial",
            left: "initial",
            backgroundColor: `${colors[props.color]}`,
            borderColor: "black",
            display: "inline-block",
            verticalAlign: "middle",
            fontWeight: "400",
            lineHeight: "1.5",
            transition: "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out",
            
        }}>{props.name}</button>
    );
}

export default Button
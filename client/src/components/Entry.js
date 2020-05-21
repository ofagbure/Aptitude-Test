import React from 'react'

function Entry(props) {
    return(
        <div className="form-group">
            <label>
                <span id='req' style={{
                    color: "red",
                    fontWeight: "bolder", 
                    display: `${props.req}`
                    }}>* 
                </span>
                {props.disp}
            </label>
            <input type={props.type} className="form-control" id={props.name} maxLength="30">
            </input>
        </div>
    );
}

export default Entry
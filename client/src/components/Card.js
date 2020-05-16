import React from 'react'

function Card(props) {

    return (
        <form>
            <div className="card">
                <div className="card-body">
                    <h2 className="lead font-weight-bold">{props.title}</h2>
                    <p>{props.sub}</p>
                    <p style={{ color: 'red'}} id={props.errorName}></p>
                        <div>{props.entry}</div>
                </div>
            </div>
        </form>
    );
}

export default Card
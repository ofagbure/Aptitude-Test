import React from 'react'

function Loading() {

    return (
        <div className="row" style={{width:"100%", marginTop: "100px"}}>
            <div className="col-md-5"></div>
            <div className="col-md-2">
                <div className="spinner-border text-danger" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
}

export default Loading
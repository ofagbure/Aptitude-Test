import React from 'react'

function Navbar(props) {
    const setPage = props.setPage;

    const homeClickHandler = () => {
        setPage('Home');
    }

    const candClickHandler = () => {
        setPage('CandidatePortal');
    }

    const roleClickHandler = () => {
        setPage('Roles');
    }
    
    let home = "black", cand = "black", role = "black";

    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container">
                <a id="logo" className="navbar-brand" href=".">Choober</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{position: "relative", float: "left", transform: "none", left: "0", top: "0"}}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li>
                            <button onClick={homeClickHandler} className="navbarLinkOp" style={{color: `${home}`}}>Home<span className="sr-only">(current)</span></button>
                        </li>
                        <li>
                            <button onClick={candClickHandler} className="navbarLinkOp" style={{color: `${cand}`}}>Candidate Portal</button>
                        </li>
                        <li>
                            <button onClick={roleClickHandler} className="navbarLinkOp" style={{color: `${role}`}}>Role Descriptions</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

import React from 'react'

function Navbar(props) {
    let home = "nav-item ", cand = "nav-item ", role = "nav-item ";
    switch(props.active) {
        case "Home":
            home += "active";
            break;
        case "Candidate Portal":
            cand += "active";
            break;
        case "Role Descriptions":
            role += "active";
            break;
    default:
        home += "active";
    }
    var link;
    if(props.setLink) {
        link = props.link;
    } else {
        link = "./candidateportal";
    }

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
                        <li className={home}>
                            <a className="nav-link" href="./home">Home<span className="sr-only">(current)</span></a>
                        </li>
                        <li className={cand}>
                            <a className="nav-link" href={link}>Candidate Portal</a>
                        </li>
                        <li className={role}>
                            <a className="nav-link" href="./roles">Role Descriptions</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar
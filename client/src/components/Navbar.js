import React from 'react'
import { useHistory } from "react-router-dom";

function Navbar(props) {
    const history = useHistory();

    function handleHomeClick() {
        history.push('/home')
    }
    function handleCandidateClick() {
        var link;
        if(props.setLink) {
            link = props.link;
        } else {
            link = "./candidateportal";
        }
        history.push(`${link}`)
    }
    function handleRoleClick() {
        history.push('/roles')
    }

    let home = "grey", cand = "grey", role = "grey";
    console.log(home,cand,role);
    switch(props.active) {
        case "Home":
            home = "white";
            break;
        case "Candidate Portal":
            cand = "white";
            break;
        case "Role Descriptions":
            role = "white";
            break;
    default:
        home = "white";
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
                        <li>
                            <button style={{color: `${home}`}} className='navSty' type='button' onClick={handleHomeClick}>Home</button>
                        </li>
                        <li>
                            <button style={{color: `${cand}`}} className='navSty' type='button' onClick={handleCandidateClick}>Candidate Portal</button>
                        </li>
                        <li>
                        <button style={{color: `${role}`}} className='navSty' type='button' onClick={handleRoleClick}>Role Descriptions</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar

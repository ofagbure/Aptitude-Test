import React, { useState } from 'react';
import ApplicantHome from "./ApplicantHome";
import Navbar from "../../components/Navbar";
import {withRouter} from 'react-router';

const axios = require('axios');

function CandidatePortal() {

    const [windowHeight, setWindowHeight] = useState(`${window.innerHeight + window.pageYOffset - 44 + "px"}`);
    const [loggedIn, setloggedIn] = useState(false);

    axios.get('/isLoggedIn')
        .then(function (res) {
            if(res.data === true) {
                setloggedIn(true);
            } else {
                window.location.replace('./login');
        }
    });

    React.useEffect(() => {
        function resize() {
            setWindowHeight(`${window.innerHeight - 44 + "px"}`);
        }

        window.addEventListener('resize', resize);
        console.log();
        
    });

    return (
        <div id='main' style={{
            height:windowHeight,overflow:"scroll",overflowX:"hidden",
            backgroundColor:'white'}}>
            <Navbar active="Candidate Portal"/>
            <div className='container'>
                <div className='row' style={{padding:"32px 0px"}}>
                    <ApplicantHome data={loggedIn}/>
                </div>

            </div>
        </div>
    );
    
}

export default withRouter(CandidatePortal);

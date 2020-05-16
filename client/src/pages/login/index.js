import React, { useState } from 'react';
import LoggedOut from "./LoggedOut";
import Navbar from "../../components/Navbar";

function Login() {

    const [windowHeight, setWindowHeight] = useState(`${window.innerHeight + window.pageYOffset - 44 + "px"}`);
    
    React.useEffect(() => {
        function resize() {
            setWindowHeight(`${window.innerHeight - 44 + "px"}`);
        }
        window.addEventListener('resize', resize);
    });



    return (
        <div id='main' style={{
            height:windowHeight,overflow:"scroll",overflowX:"hidden",
            backgroundColor:'white'}}>
            <Navbar active="Candidate Portal"/>
            <div className='container'>
                <div className='row' style={{padding:"32px 0px"}}>
                    <LoggedOut />
                </div>
            </div>
        </div>

    );
    
}

export default Login;

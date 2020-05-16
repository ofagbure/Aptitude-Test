import React, { useState } from 'react';
import Button from "../../components/Button";
import Loading from '../../components/Loading';
import Portfolio from "./Portfolio";

const axios = require('axios');

function ApplicantHome (props) {

    const [HasPortfolio, setHasPortfolio] = useState(false);

    
    React.useEffect(() => {
        let usrEmail = window.atob(localStorage.getItem("email"));
        axios.get(`/api/one/user/email/${usrEmail}`)
        .then(function (result) {
            if(result.data.recruiter) {
                window.location.replace('./recruiterportal');
            }
        })
        axios.get(`/api/one/profile/email/${window.atob(localStorage.getItem("email"))}`)
        .then(function (result) {
            if(result.data !== null) {
                setHasPortfolio(true);
            }
        })
        
    });

    if(localStorage.getItem("email") === null) { 
        window.location.replace('./login');
    }

    if(props.data && localStorage.getItem("email") !== null) {
        const usrEmail = window.atob(localStorage.getItem("email"));
        
        const logout = () => {
            axios.post('/logout',{
                email: usrEmail,
            })
            .then(function () {
                localStorage.removeItem("email");
                window.location.replace('./home');
            })
        }
        
        return (
            <div className='home' style={{width: "100%"}}>
                <div className='row'>
                    
                    <div className='col-md-12 text-right mb-3' 
                        style={{
                            position: "relative",
                            right: "15px"
                        }}>
                        <Button name="Log Out" color="0" onclick={logout}/>
                    </div>
                </div>
                <Portfolio hasPortfolio={HasPortfolio} setPortfolio={setHasPortfolio} />
            </div>

        );
    } else {
        return ( <Loading /> );
    }
}

export default ApplicantHome;
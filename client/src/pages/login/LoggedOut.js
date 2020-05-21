import React, {useState} from 'react';
import Entry from '../../components/Entry'
import Card from '../../components/Card'
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import LoggedOutFunctions from './LoggedOutFunctions'

const axios = require('axios');
var btnHitHere = '';


function LoggedOut() {

    const [BtnHitHere, setBtnHitHere] = useState('none');

    function signInHandler() {
        setBtnHitHere('signin');
    }

    function registerClickHandler() {
        setBtnHitHere('register');
    }

    return (
        <div className="jumbotron" style={{margin:"8px 16px",paddingTop: "32px"}}>
            
            <h1 className="display-4 text-center" style={{marginBottom:"32px"}}>Welcome to the Choober Candidate Portal!</h1>
            <Card title="Have an account?" sub="Please enter your login information below. Both your username and password are case sensitive"
                errorName="signInError"
                entry={[
                    <Entry key='emailLoginEntry' req="none" type="email" name="userEmail" disp="Email Address"/>,
                    <Entry key='passwordLoginEntry' req="none" type="password" name="userPassword" disp="Password"/>,
                    <div key='signInBtnContainer' className="text-center">
                        <button className="btn btn-primary" id="userSignInBtn" style={{color:"white"}} onClick={()=>{signInHandler()}}>Sign In</button>
                    </div>
                ]}
            />
            <br></br>
            <Card title="Not a registered user yet?" sub="Create an account to apply for our opportunities. Login credentials are case sensitive"
                errorName="registerError"
                entry={[
                    <Entry key='emailCreateEntry' req="none" type="newEmail" name="newEmail" disp="Email Address"/>,
                    <Entry key='passwordCreateEntry' req="none" type="password" name="newPassword1" disp="Password"/>,
                    <Entry key='passwordCheckCreateEntry' req="none" type="password" name="newPassword2" disp="Re-type Password"/>,
                    <div key='createUserBtnContainer' className="text-center">
                        <button className="btn btn-primary" id="createUserBtn" style={{color:"white"}} onClick={()=>{registerClickHandler()}}>Create Account</button>
                    </div>
                ]}
            />
            <LoggedOutFunctions BtnHitHere={BtnHitHere}/>
        </div>
    );


}

// function isEmpty(string) {
//     if(string === null || string === "" || /\s/g.test(string) === "") {
//         return true;
//     } else {
//         return false;
//     }
// }

// function emailVaild(email) {
// /*
// The code for the emailValidation regex was taken from:
// https://www.w3resource.com/javascript/form/email-validation.php
// */
//     if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
//         return (true)
//     }
//     return (false)
// }

export default LoggedOut;
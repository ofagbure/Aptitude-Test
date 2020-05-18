import React from 'react';
import Entry from '../../components/Entry'
import Card from '../../components/Card'

const axios = require('axios');

function LoggedOut() {
    
    return (
        <div className="jumbotron" style={{margin:"8px 16px",paddingTop: "32px"}}>
            
            <h1 className="display-4 text-center" style={{marginBottom:"32px"}}>Welcome to the Choober Candidate Portal!</h1>
            <Card title="Have an account?" sub="Please enter your login information below. Both your username and password are case sensitive"
                errorName="signInError"
                entry={[
                    <Entry key='emailLoginEntry' req="none" type="email" name="userEmail" disp="Email Address"/>,
                    <Entry key='passwordLoginEntry' req="none" type="password" name="userPassword" disp="Password"/>,
                    <div key='signInBtnContainer' className="text-center">
                        <a className="btn btn-primary" id="userSignInBtn" style={{color:"white"}} onClick={signIn} href='javascript:void(0)'>Sign In</a>
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
                        <a className="btn btn-primary" id="createUserBtn" style={{color:"white"}} onClick={register} href="javascript:void(0)">Create Account</a>
                    </div>
                ]}
            />
        </div>
    );


}

function signIn() {
    const userEmail = document.getElementById('userEmail');
    const userPassword = document.getElementById('userPassword');
    const signInError = document.getElementById('signInError');

    userEmail.style.border = "1px solid #ced4da";
    userPassword.style.border = "1px solid #ced4da";
    if(isEmpty(userEmail.value)) { userEmail.style.border = "2px solid red";return;}
    if(isEmpty(userPassword.value)) { userPassword.style.border = "2px solid red";return;}
    axios.post('/login', {
        email: userEmail.value,
        password: userPassword.value
        })
        .then(function () {

            axios.get(`/api/one/user/email/${userEmail.value}`)
                .then(function (response) {
                    console.log(response)
                    if(response.data !== false) {
                        localStorage.setItem("email", `${window.btoa( userEmail.value )}`);
                        window.location.replace('/candidateportal');
                    } else {
                        signInError.innerHTML = 'Incorrect username or password';
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    signInError.innerHTML = 'Server load error--try refreshing!';
                });
        })
        .catch(function (error) {
            console.log(error);
            signInError.innerHTML = 'Server load error--try refreshing!';
        })
}

function isEmpty(string) {
    if(string === null || string === "" || /\s/g.test(string) === "") {
        return true;
    } else {
        return false;
    }
}

function emailVaild(email) {
/*
The code for the emailValidation regex was taken from:
https://www.w3resource.com/javascript/form/email-validation.php
*/
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true)
    }
    return (false)
}

function register() {
    const newEmail = document.getElementById('newEmail');
    const newPassword1 = document.getElementById('newPassword1');
    const newPassword2 = document.getElementById('newPassword2');
    const registerError = document.getElementById('registerError');
    newEmail.style.border = "1px solid #ced4da";
    newPassword1.style.border = "1px solid #ced4da";
    newPassword2.style.border = "1px solid #ced4da";
    registerError.innerHTML = '';
    if(isEmpty(newEmail.value)){ newEmail.style.border = "2px solid red";return; }
    if(!emailVaild(newEmail.value)) {
        newEmail.style.border = "2px solid red";
        registerError.innerHTML = 'Invalid email address';
        return;
    }
    if(isEmpty(newPassword1.value)){ newPassword1.style.border = "2px solid red";return; }
    if(newPassword1.value !== newPassword2.value) {
        newPassword1.style.border = "2px solid red";
        newPassword2.style.border = "2px solid red";
        registerError.innerHTML = 'Passwords do not match';
        return;
    }
    newEmail.style.border = "3px solid green";
    axios.post('/local-reg', {
        email: newEmail.value,
        password: newPassword1.value
    })
    .then(function(response) {
        axios.post('/login', {
            email: newEmail.value,
            password: newPassword1.value,
            function(req, res) {
                console.log(res);
            }
            })
            .then(function () {
                localStorage.setItem("email", `${window.btoa( newEmail.value )}`);
                window.location.replace('/candidateportal');
            })
            .catch(function (error) {
                console.log(error);
                registerError.innerHTML = 'Server connection error--try refreshing!';
            })
    })
    .catch(function(error) {
        console.log(error);
    });
}


export default LoggedOut;
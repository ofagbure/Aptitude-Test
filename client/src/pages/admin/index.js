import React from 'react';
import Card from '../../components/Card';
import Entry from '../../components/Entry';
const axios = require('axios');

function Admin (props) {
    const setPage = props.setPage;

    const createRecruiterHandler = (event) => {
        event.preventDefault();
        const userEmail = document.getElementById('userEmail');
        const userPassword = document.getElementById('userPassword');
        userEmail.style.border = "1px solid #ced4da";
        userPassword.style.border = "1px solid #ced4da";
        if(isEmpty(userEmail.value)) { userEmail.style.border = "2px solid red";return;}
        if(isEmpty(userPassword.value)) { userPassword.style.border = "2px solid red";return;}
        axios
        .post('/api/newRecruiter',{
            email: userEmail.value,
            password: userPassword.value
        })
        .then(function (res) {
            if(res.data === 'Email already in use') {
                userEmail.style.border = "2px solid red";
                userEmail.value = 'Email already in use';
                return;
            } else if (res.data === true) {
                userEmail.value = 'Added!';
                setTimeout(() => {
                    userEmail.value = '';
                },500)
                userPassword.value = '';
            } else {
                userEmail.value = 'Server error, please reload!';
            }
            
        })
    }

    function isEmpty(string) {
        if(string === null || string === "" || /\s/g.test(string) === "") {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className='container'>
            <h1 style={{textAlign: 'center'}}>ADMIN</h1>
            <Card title="Create a new Recruiter account" sub="Please enter your desired username and password below"
                errorName="signInError"
                entry={[
                    <Entry key='emailRecruiterLoginEntry' req="none" type="text" name="userEmail" disp="E m a i l - A d d r e s s" />,
                    <Entry key='passwordRecruiterLoginEntry' req="none" type="text" name="userPassword" disp="P a s s w o r d" />,
                    <div key='recruiterBtnContainer' className="text-center">
                        <button onClick={createRecruiterHandler} className="btn btn-primary" id="createRecruiterBtn" style={{ color: "white" }}>Create</button>
                    </div>
                ]}
            />
        </div>
    );
}

export default Admin;
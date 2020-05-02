document.addEventListener("DOMContentLoaded", function(){
    
    //Sign in variables
    const userEmail = document.getElementById('userEmail');
    const userPassword = document.getElementById('userPassword');
    const signInBtn = document.getElementById('userSignInBtn');
    const signInError = document.getElementById('signInError');
    //New account variables
    const newEmail = document.getElementById('newEmail');
    const newPassword1 = document.getElementById('newPassword1');
    const newPassword2 = document.getElementById('newPassword2');
    const createUserBtn = document.getElementById('createUserBtn');
    const createAccError = document.getElementById('createAccError');
    //Page variables
    const main = document.getElementById('mainDisplay');

    signInBtn.addEventListener("click", function() {
        userEmail.style.border = "1px solid #ced4da";
        userPassword.style.border = "1px solid #ced4da";
        if (isEmpty(userEmail.value)) {
            userEmail.style.border = "2px solid red";
            return;
        } else if (isEmpty(userPassword.value)) {
            userPassword.style.border = "2px solid red";
            return;
        } else {
            signIn();
        }

    });
    createUserBtn.addEventListener("click", function() {
        newEmail.style.border = "1px solid #ced4da";
        newPassword1.style.border = "1px solid #ced4da";
        newPassword2.style.border = "1px solid #ced4da";
        if (isEmpty(newEmail.value)) {
            newEmail.style.border = "2px solid red";
            return;
        } else if (!emailValidation(newEmail.value)) {
            newEmail.style.border = "2px solid red";
            createAccError.style.display = "block";
            createAccError.innerText = "Invalid email address!";
            return;
        } else if (isEmpty(newPassword1.value)) {
            newPassword1.style.border = "2px solid red";
            return;
        } else if (newPassword1.value !== newPassword2.value) {
            newPassword1.style.border = "2px solid red";
            newPassword2.style.border = "2px solid red";
            return;
        } else {
            createNewUser();
        }
    });
    function clear() {
        main.innerHTML = "";
    }

    function isEmpty(string) {
        if(string === null || string === "" || /\s/g.test(string) === "") {
            return true;
        } else {
            return false;
        }
    }

    function signIn() {
        $.ajax({
            url: "/auth",
            type: "GET",
            data: {
                email : userEmail.value,
                password : userPassword.value
            },
            success: function(response) {
                if(response){
                    window.localStorage.setItem('user', JSON.stringify(response));
                    window.location = '/candidateportal';
                    return;
                } else {
                    signInError.style.display = "block";
                    signInError.innerText = "Wrong username/password";
                    return;
                }
            },
            error: function(error) {
                signInError.style.display = "block";
                signInError.innerText = "Problem connecting to server--try reloading!";
                console.log(error);

            }
        });
    }
    function createNewUser() {
        let a = {
            email : newEmail.value,
            password : newPassword1.value,
            isRecruiter : 0
        };
        console.log("a has been set" + JSON.stringify(a));
        $.ajax("/api/addUser", {
            type: "PUT",
            data: a
        }).then( function (err, res) {
            if(err) {
                createAccError.style.display = "block";
                createAccError.innerText = "Problem connecting to server--try reloading!";
                console.log(err);
                return;
            }
            
            $.ajax({
                url: "/auth",
                type: "GET",
                data: {
                    email : a.email,
                    password : a.password
                },
                success: function(response) {
                    if(response){
                        window.localStorage.setItem('user', JSON.stringify(response));
                        window.location = '/candidateportal';
                        return;
                    } else {
                        createAccError.style.display = "block";
                        createAccError.innerText = "Problem connecting to server--try reloading!";
                        return;
                    }
                },
                error: function(error) {
                    createAccError.style.display = "block";
                    createAccError.innerText = "Problem connecting to server--try reloading!";
                    console.log(error);
                }
            });
        });
    }
});
/*
The code for the emailValidation regex was taken from:
https://www.w3resource.com/javascript/form/email-validation.php
*/
function emailValidation(emailAddress) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)) {
        return (true)
    }
    return (false)
}
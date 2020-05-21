import React from 'react';
import images from '../../images';
import Entry from '../../components/Entry';
const axios = require('axios');

function CreateProfile(props) {
    const setPage = props.setPage;
    const email = `${window.btoa('email')}`
    const usrEmail = window.atob(localStorage.getItem(`${email}`));
    
    React.useEffect(()=>{
        getProfile();
    });

    var hasProfile = false;
    var usrWebsite = '';
    const getProfile = async () => {
        const response = await axios
            .post('/api/profile', {
                email: usrEmail,
            })
            .then(function (res) {
                return res;
            })
        if (response.data === null) {
            hasProfile = false;
            return;
        } else {
            hasProfile = true;
            document.getElementById('userDescription').value = `${response.data.description}`;
            document.getElementById('firstName').value = `${response.data.firstName}`;
            document.getElementById('lastName').value = `${response.data.lastName}`;
            document.getElementById('city').value = `${response.data.city}`;
            document.getElementById('profilePic').value = `${response.data.profileImg}`;
            document.getElementById('website').value = `${response.data.website}`;
            var willMove = response.data.willMove;
            document.getElementById('yesCheckbox').checked = willMove;
            document.getElementById('noCheckbox').checked = !willMove;
            if (`${response.data.profileImg}` === "defaultImage") {
                console.log('default');
            } else {
                document.getElementById('usrProfilePic').src = `${response.data.profileImg}`;
            }
            usrWebsite = response.data.website;
        }
    }

    const saveProfile = () => {
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const city = document.getElementById('city');
        var profilePic = document.getElementById('profilePic');
        var userDescription = document.getElementById('userDescription');
        const website = document.getElementById('website');
        const yesCheckbox = document.getElementById('yesCheckbox');

        firstName.style.border = "1px solid #ced4da";
        lastName.style.border = "1px solid #ced4da";
        city.style.border = "1px solid #ced4da";

        if(isEmpty(firstName)) {return}
        if(isEmpty(lastName)) {return}
        if(isEmpty(city)) {return}

        if(isEmpty(userDescription, false)) {
            userDescription.value = "Not yet completed";
        }
        if(isEmpty(profilePic.value, false)) {
            profilePic.value = usrWebsite;
        }
        linkFormatter(profilePic);
        linkFormatter(website);

        if(hasProfile === true) {
            axios.post("/updateUser/", {
                firstName: firstName.value,
                lastName: lastName.value,
                profilePic: profilePic.value,
                website: website.value,
                userDescription: userDescription.value,
                city: city.value,
                willMove: yesCheckbox.checked,
                email: usrEmail
            })
            .then(function (res) {
                if(res) {
                    console.log(res);
                    setPage('Candidate');
                }
            });
            return;
        } else {
            axios.post("/addProfile/", {
                firstName: firstName.value,
                lastName: lastName.value,
                profilePic: profilePic.value,
                website: website.value,
                userDescription: userDescription.value,
                city: city.value,
                willMove: yesCheckbox.checked,
                email: usrEmail
            })
            .then(function (res) {
                if(res) {
                    console.log(res);
                    setPage('Candidate');
                } else {
                    alert('error')
                }
            });

        }
        
    }

    function isEmpty(obj, red = true) {
        if(obj.value === null || obj.value === "" || /\s/g.test(obj.value) === "") {
            if(red) {
                obj.style.border = "2px solid red";
            }
            return true;
        } else {
            return false;
        }
    }

    function linkFormatter(obj) {
        if(obj.value) {
            if(obj.value.length > 12) {
                let test1 = obj.value.slice(0, 8).toLowerCase()
                let test2 = obj.value.slice(0, 7).toLowerCase()
                if(test1 !== "https://" && test2 !== "http://") {
                    obj.value = "https://" + obj.value;
                }
            }
        }
    }

    return (
        <div>
            <div>
                <h1 style={{ textAlign: "center" }}>User Information</h1>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <Entry req="initial" type="text" name="firstName" disp="First Name" />
                    </div>
                    <div className="form-group col-md-6">
                        <Entry req="initial" type="text" name="lastName" disp="Last Name" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <Entry req="initial" type="text" name="city" disp="City" />
                    </div>
                    <div className="animate form-group col-md-6">
                        <span style={{ color: "red", fontWeight: "bolder" }}>* </span>
                        <label><p>Are you willing to relocate?</p></label>
                        <div id='yesNoOptions' style={{ position: "relative", left: "30px", bottom: "20px" }}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="willMoveCheck" id="yesCheckbox" value="true" defaultChecked={true} />
                                <label className="form-check-label">
                                    Yes
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="willMoveCheck" id="noCheckbox" value="false" />
                                <label className="form-check-label">
                                    No
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 style={{ textAlign: "center" }}>Profile Creation</h1>
                <br />
                <div className="form-row media">
                    <div className="col-md-4" style={{ textAlign: "center" }}>
                        <img id="usrProfilePic" src={images.defaultImage} alt="profile pic" style={{ width: "200px", borderRadius: "100px" }} />
                    </div>
                    <div className="col-md-8">
                        <p>Enter a link to an image for your profile picture</p>
                        <input type="text" className="form-control" id="profilePic" maxLength="499" />
                        <label>Describe yourself!</label>
                        <textarea className="form-control" id="userDescription" rows="3" maxLength="499"></textarea>
                    </div>
                </div>
                <br />
                <div className="form-row">
                    <div className="col-md-2"></div>
                    <div className="animate form-group col-md-8">
                        <p style={{ textAlign: "center" }}>Enter a link to your personal website or portfolio</p>
                        <input type="text" className="form-control" id="website" maxLength="60" />
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <button onClick={saveProfile}>Save!</button>
                </div>

            </div>
        </div>
    );
}

export default CreateProfile;
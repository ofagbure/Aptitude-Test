import React, { useContext } from 'react';
import Entry from '../../components/Entry';
import Button from '../../components/Button';
import images from '../../images';

const axios = require('axios');

function NoPortfolio(props) {
    console.log(props);
    React.useEffect(() => {
        if(props.edit) {
            populatePortfolio();
        }
    });
    
    function savePortfolio (type) {
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const city = document.getElementById('city');
        var profilePic = document.getElementById('profilePic');
        var userDescription = document.getElementById('userDescription');
        const website = document.getElementById('website');
        const yesCheckbox = document.getElementById('yesCheckbox');
        
        if(firstName === null) {
            window.location.replace('./candidateportal');
        }
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
            profilePic.value = "defaultImage";
        }
    
        linkFormatter(profilePic);
        linkFormatter(website);
        let email = window.atob(localStorage.getItem("email"));
        if(type === "new") {
            axios.post("/addUser/", {
                firstName: firstName.value,
                lastName: lastName.value,
                profilePic: profilePic.value,
                website: website.value,
                userDescription: userDescription.value,
                city: city.value,
                willMove: yesCheckbox.checked,
                email: email
            })
            .then(function (res) {
                if(res) {
                    props.setPortfolio(true);
                    window.location.replace('./candidateportal');
                } else {
                    alert('error')
                }
            });
        } else {
            axios.post("/updateUser/", {
                firstName: firstName.value,
                lastName: lastName.value,
                profilePic: profilePic.value,
                website: website.value,
                userDescription: userDescription.value,
                city: city.value,
                willMove: yesCheckbox.checked,
                email: email
            })
            .then(function (res) {
                if(res) {
                    console.log(res);
                    props.setEditPortfolio(false);
                    window.location.replace('./candidateportal')
                }
            });
        }
    }


    if(props.edit) {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>User Information</h1>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <Entry req="initial" type="text" name="firstName" disp="First Name" req="initial"/>
                    </div>
                    <div className="form-group col-md-6">
                        <Entry req="initial" type="text" name="lastName" disp="Last Name" req="initial"/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <Entry req="initial" type="text" name="city" disp="City" req="initial"/>
                    </div>
                    <div className="animate form-group col-md-6">
                        <span style={{color: "red", fontWeight: "bolder"}}>* </span>
                        <label><p>Are you willing to relocate?</p></label>
                        <div id='yesNoOptions' style={{position: "relative",left:"30px",bottom:"20px"}}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="willMoveCheck" id="yesCheckbox" value="true" defaultChecked={true}/>
                                <label className="form-check-label">
                                    Yes
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="willMoveCheck" id="noCheckbox" value="false"/>
                                <label className="form-check-label">
                                    No
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 style={{textAlign: "center"}}>Profile Creation</h1>
                <br/>
                <div className="form-row media">
                    <div className="col-md-4" style={{textAlign: "center"}}>
                        <img id="usrProfilePic" src={images.defaultImage} alt="profile pic" style={{width: "200px", borderRadius: "100px"}}/>
                    </div>
                    <div className="col-md-8">
                        <p>Enter a link to an image for your profile picture</p>
                        <input type="text" className="form-control" id="profilePic" maxLength="499"/>
                        <label>Describe yourself!</label>
                        <textarea className="form-control" id="userDescription" rows="3" maxLength="499"></textarea>
                    </div>
                </div>
                <br/>
                <div className="form-row">
                    <div className="col-md-2"></div>
                    <div className="animate form-group col-md-8">
                        <p style={{textAlign: "center"}}>Enter a link to your personal website or portfolio</p>
                        <input type="text" className="form-control" id="website" maxLength="60"/>
                    </div>
                </div>
                <div style={{textAlign: "center"}}>
                    <Button name="Save" color="2" onclick={function(){savePortfolio("old")}}/>
                </div>

            </div>
        );
    } else {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>User Information</h1>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <Entry req="initial" type="text" name="firstName" disp="First Name" req="initial"/>
                    </div>
                    <div className="form-group col-md-6">
                        <Entry req="initial" type="text" name="lastName" disp="Last Name" req="initial"/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <Entry req="initial" type="text" name="city" disp="City" req="initial"/>
                    </div>
                    <div className="animate form-group col-md-6">
                        <span style={{color: "red", fontWeight: "bolder"}}>* </span>
                        <label><p>Are you willing to relocate?</p></label>
                        <div id='yesNoOptions' style={{position: "relative",left:"30px",bottom:"20px"}}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="willMoveCheck" id="yesCheckbox" value="true" defaultChecked={true}/>
                                <label className="form-check-label">
                                    Yes
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="willMoveCheck" id="noCheckbox" value="false"/>
                                <label className="form-check-label">
                                    No
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 style={{textAlign: "center"}}>Profile Creation</h1>
                <br/>
                <div className="form-row media">
                    <div className="col-md-4" style={{textAlign: "center"}}>
                        <img id="usrProfilePic" src={images.defaultImage} alt="profile pic" style={{width: "200px", borderRadius: "100px"}}/>
                    </div>
                    <div className="col-md-8">
                        <p>Enter a link to an image for your profile picture</p>
                        <input type="text" className="form-control" id="profilePic" maxLength="499"/>
                        <label>Describe yourself!</label>
                        <textarea className="form-control" id="userDescription" rows="3" maxLength="499"></textarea>
                    </div>
                </div>
                <br/>
                <div className="form-row">
                    <div className="col-md-2"></div>
                    <div className="animate form-group col-md-8">
                        <p style={{textAlign: "center"}}>Enter a link to your personal website or portfolio</p>
                        <input type="text" className="form-control" id="website" maxLength="60"/>
                    </div>
                </div>
                <div style={{textAlign: "center"}}>
                    <Button name="Save" color="2" onclick={function(){savePortfolio("new")}}/>
                </div>

            </div>
        );
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

function populatePortfolio() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const city = document.getElementById('city');
    var profilePic = document.getElementById('profilePic');
    const userDescription = document.getElementById('userDescription');
    const website = document.getElementById('website');
    const yesCheckbox = document.getElementById('yesCheckbox');
    const noCheckbox = document.getElementById('noCheckbox');
    axios.get(`/api/one/profile/email/${window.atob(localStorage.getItem("email"))}`)
    .then(function (result) {
        if(isEmpty(result.data.profileImg, false)) {
            profilePic.value = "defaultImage";
        } else {
            profilePic.value = result.data.profileImg;
        }
        console.log('pop ', result)
        firstName.value = result.data.firstName;
        lastName.value = result.data.lastName;
        city.value = result.data.city;
        userDescription.value = result.data.description;
        website.value = result.data.website;
        yesCheckbox.checked = result.data.willMove;
        noCheckbox.checked = !result.data.willMove;
    })
}

export default NoPortfolio;
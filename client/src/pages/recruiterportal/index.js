import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import images from '../../images';

const axios = require('axios');
const usrEmail = window.atob(localStorage.getItem("email"));
var once = true;

function RecruiterPortal() {
    
    const [windowHeight, setWindowHeight] = useState(`${window.innerHeight + window.pageYOffset - 44 + "px"}`);

    React.useEffect(() => {
        function resize() {
            setWindowHeight(`${window.innerHeight - 44 + "px"}`);
        }
        window.addEventListener('resize', resize);
    });

    React.useEffect(() => {
        scheduledInterviews();
        allApplicants();
        populateRecruiters();
    }, []);

    const logout = () => {
        axios.post('/logout', {
            email: usrEmail,
        })
            .then(function (response) {
                localStorage.removeItem("email");
                window.location.replace('./home');
            })
    }

    axios.get('/isLoggedIn')
        .then(function (res) {
            if (res.data !== true) {
                window.location.replace('./login');
            }
        });

    const usrEmail = window.atob(localStorage.getItem("email"));

    axios.get(`/api/one/user/email/${usrEmail}`)
        .then(function (result) {
            if (!result.data.recruiter) {
                window.location.replace('./candidateportal');
            }
        })
    return (
        <div id='main' style={{
            height: windowHeight, overflow: "scroll", overflowX: "hidden",
            backgroundColor: 'white'
        }}>
            <Navbar active="Candidate Portal" setLink={true} link="recruiterportal" />
            <div className='container'>
                <div className='row' style={{ padding: "32px 0px" }}>
                    <div className="col-md"></div>
                    <div className="col-md-3">

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <h3 className="text-center" style={{ fontFamily: "century-old-style-std,serif", borderTop: "1px solid black" }}>My Scheduled Interviews</h3>
                        <div id="tableMain" className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <Button name="Log Out" color="0" onclick={logout} />

                                <div id='recruiterProfile' className="cantTouchThis">
                                    <h3 id='recruiterEmailDisplay' className="text-center" style={{ color: "#fff", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} alt="Recruiter Email Address">{window.atob(localStorage.getItem("email"))}</h3>
                                    <div style={{ backgroundColor: "#fff", margin: "10px", borderRadius: "10px" }}>
                                        <h5 className="text-center">Welcome!</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="middle"></div>
            </div>
            <div className="modal fade" id="profileDispModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="userProfTitle">Portfolio</h5>
                            <a href="#" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </a>
                        </div>
                        <div className="modal-body">
                            <div id="portfolioBackground" style={{ backgroundImage: `url('${images[1]}')` }}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <img id='modalProfPic' src="" className="align-self-start mr-3" alt="profile pic" style={{ width: "200px", borderRadius: "100px", border: "10px solid white", boxShadow: "-5px 10px 10px grey" }} />
                                    </div>
                                    <div className="col-md-6">
                                        <h1 id='modalName'></h1>
                                        <a id='modalPortfolio' href="#" target="_blank">Portfolio</a>
                                        <p id='modalLocation'>city ••• willMove?</p>
                                        <h5>Test Result:</h5>
                                        <p id='modalTestResults'>Test Result</p>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-8" style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px" }}>
                                        <p id='modalDescription' style={{ overflow: "hidden", wordBreak: "break-word" }}>Description</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="scheduleInterviewModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="intModName"></h5>
                            <a href="#" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </a>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <h4>Select Interviewer</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <input id='filterSearch' type="text" placeholder="Search by email"  style={{ margin: "0px 0px 10px", width: "100%" }} />
                                    
                                    <select id="selectSchedInter" size="5" style={{ width: "100%" }}>
                                    
                                    {/* user.id */}
                                    </select>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-12">
                                    <h4>Enter a location:</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <textarea id='intrvwLocation' rows="3" style={{ width: "100%", textAlign: "center" }} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <input type="datetime-local" id="interviewTime" name="interviewTime" />
                                    <a href="#"  id="scheduleBtn" style={{ margin: "5px" }}>Schedule!</a>
                                    {/* onClick="" scheduleSend('${id}') */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}//intModName

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

function populateRecruiters() {
    axios.get(`/api/all/recruiters`)
        .then(function (results) {
        
            var options = "";
            for(var i = 0; i < results.data.length; i++) {
                if(results.data[i].email === usrEmail) {
                    options += `<option value="${results.data[i].email}">${results.data[i].email} (you)</option>`;
                }
                if(results.data[i].email !== usrEmail) {
                    options += `<option value="${results.data[i].email}">${results.data[i].email}</option>`;
                }
            }
            document.getElementById('selectSchedInter').innerHTML += options;
    });
}

function scheduledInterviews() {
    axios.get(`/api/all/interviews/email/${usrEmail}`)
        .then(function (results) {
            var table = `
        <table class="table table-striped table-dark text-center" id="interviewTable">
        <thead><tr>
            <th scope="col">user</th>
            <th scope="col">date</th>
            <th scope="col">time</th>
            <th scope="col">Location</th>
        </tr></thead><tbody>`;
            let obj = results.data;
            var result = Object.keys(obj).map(function (key) {
                return obj[key];
            });
            /* For reference
                resultArray = [
                    [0]applicant's id, [1]recruiter's email,
                    [2]applicant's email, [3]interview time,
                    [4]interview location
                ]
            */
            for (var i = 0; i < result.length; i ++) {
                var interviewTime = new Date(`${result[i].interviewTime}`);
                var options = { weekday: 'long', month: 'long', year: 'numeric', day: 'numeric' };
                var dateOut = interviewTime.toLocaleDateString("en-US", options);
                var hours = interviewTime.getHours();
                var minutes = interviewTime.getMinutes();
                var timestring = 'AM';
                if (hours >= 12) {
                    timestring = 'PM';
                    if (hours != 12) {
                        hours -= 12;
                    }
                }
                table += `<tr><th scope="row">${result[i].applicantEmail}</th>`;
                table += `<td>${dateOut}</td>`;
                table += `<td>${hours}:${minutes} ${timestring}</td>`;
                table += `<td>${result[i].interviewLocation}</td></tr>`;
            }
            table += `</tbody></table>`;
            document.getElementById('tableMain').innerHTML = table;
        })
}

function allApplicants() {
    axios.get(`/api/all/applicants`)
        .then(function (results) {
            const middle = document.getElementById('middle');
            var table = `
            <table class="table table-striped table-dark text-center" id="allUsersTable">
            <thead><tr>
                <th scope="col">user</th>
                <th scope="col">name</th>
                <th scope="col">test results</th>
                <th scope="col">interviews</th>
                <th scope="col">profile</th>
            </tr></thead><tbody id="tableInsert"></tbody></table>`;
            middle.innerHTML = table;
            const tableInsert = document.getElementById('tableInsert');
            for (var i = 0; i < results.data.length; i++) {
                axios.get(`/api/one/profile/email/${results.data[i].email}`)
                    .then(function (result) {
                        const fullName = `${result.data.firstName} ${result.data.lastName}`;
                        const email = `${result.data.email}`;
                        if (result.data !== null) {
                            let table = `<tr><th scope="col">${result.data.email}</th>`
                            table += `<th scope="col">${result.data.firstName} ${result.data.lastName}</th>`
                            table += `<th scope="col">${result.data.testResults}</th>`
                            table += `<th scope="col" id='interviews${result.data.email}'> NULL </td>`
                            table += `<th scope="col"> <a href="#" data-toggle="modal" data-target="#profileDispModal" class='viewProfLink' email="${result.data.email}">view</a> </td></tr>`;
                            tableInsert.innerHTML += table;
                            let url = `/api/one/interview/applicant/email/${email}`;
                            axios.get(url)
                                .then(function (result) {
                                    if (result.data === null) {
                                        document.getElementById(`interviews${email}`).innerHTML = `<a href="#" id="${email}" data-toggle="modal" data-target="#scheduleInterviewModal">schedule</a>`;
                                        document.getElementById(`${email}`).addEventListener('click', function() {
                                            document.getElementById('intModName').innerHTML = `${email}`;
                                        })
                                    } else {
                                        document.getElementById(`interviews${email}`).innerHTML = "Scheduled!"
                                    }
                                })
                        }
                        addListeners();
                    })
            }
        });
}

function addListeners() {
    
        let allViewBtns = document.getElementsByClassName('viewProfLink');
        for (var i = 0; i < allViewBtns.length; i++) {
            allViewBtns[i].addEventListener("click", function (event) {
                viewProfile(event.target.attributes[4].nodeValue);
            })
        }
    if(once){
        document.getElementById('scheduleBtn').addEventListener("click", function () {
            scheduleInterview();
        });
        document.getElementById('filterSearch').addEventListener("keyup", function() {
            tableFilter();
        });
        once = false;
    } else {
        return;
    }
}

function tableFilter() {
    let search = document.getElementById('filterSearch').value.toLowerCase();
    let options = document.getElementsByTagName('option');
    if (search === "") {
        for(var j = 0; j < options.length; j++) {
            options[j].style.display = "";
        }
    } else {
        let tmpOps = options;
        for(var i = 0; i < search.length; i++) {
            for(var j = 0; j < tmpOps.length; j++) {
                if(search.slice(0,i+1) === tmpOps[j].text.slice(0,i+1).toLowerCase()) {
                    tmpOps[j].style.display = "";
                } else {
                    tmpOps[j].style.display = "none";

                }
            }
        }
    }
}

function scheduleInterview() {
    var intModName = document.getElementById('intModName');
    var selectSchedInter = document.getElementById('selectSchedInter');
    var intrvwLocation = document.getElementById('intrvwLocation');
    var interviewTime = document.getElementById('interviewTime');

    selectSchedInter.style.border = "1px solid #ced4da";
    intrvwLocation.style.border = "1px solid #ced4da";
    interviewTime.style.border = "1px solid #ced4da";

    if(isEmpty(selectSchedInter)){ return; }
    if(isEmpty(intrvwLocation)){ return; }
    if(isEmpty(interviewTime)){ return; }
    
    let newInterview = {
        recruiterEmail: selectSchedInter.value,
        applicantEmail: intModName.innerHTML,
        interviewTime: interviewTime.value,
        interviewLocation: intrvwLocation.value
    }
    console.log(newInterview);
    axios.post(`/addInterview`, newInterview)
    .then(function (result) {
        setTimeout(function() {
            window.location.replace('./recruiterportal')
        },1000)
    });
}

function viewProfile(email) {
    axios.get(`/api/one/profile/email/${email}`)
        .then(function (result) {
            const modalName = document.getElementById('modalName');
            const modalPortfolio = document.getElementById('modalPortfolio');
            const modalLocation = document.getElementById('modalLocation');
            const modalTestResults = document.getElementById('modalTestResults');
            const modalDescription = document.getElementById('modalDescription');
            const modalProfPic = document.getElementById('modalProfPic');
            let willMove;
            if (result.data.willMove) {
                willMove = "Willing to move";
            } else {
                willMove = "Local only";
            }
            var profSrc;
            if (result.data.profileImg === "defaultImage") {
                profSrc = images["defaultImage"];
            } else {
                profSrc = result.data.profileImg;
            }

            modalName.innerHTML = `${result.data.firstName} ${result.data.lastName}`;
            modalPortfolio.href = `${result.data.website}`;
            modalLocation.innerHTML = `${result.data.city} ••• ${willMove}`;
            modalTestResults.innerHTML = `${result.data.testResults}`;
            modalDescription.innerHTML = `${result.data.description}`;
            modalProfPic.src = `${profSrc}`
        })
}




export default RecruiterPortal;
import React from 'react';
import images from '../../images';
const axios = require('axios');

function Candidate(props) {
    const setPage = props.setPage;

    React.useEffect(function () {
        getProfile();
        getInterview();
        window.scrollTo(0, 0);
    });
    const email = `${window.btoa('email')}`
    const usrEmail = window.atob(localStorage.getItem(`${email}`));
    const getProfile = async () => {
        const response = await axios
            .post('/api/profile', {
                email: usrEmail,
            })
            .then(function (res) {
                return res;
            })
        if (response.data === null) {
            setPage('CreateProfile');
            return;
        }

        document.getElementById('usrDescription').innerHTML = `${response.data.description}`;
        document.getElementById('usrName').innerHTML = `${response.data.firstName} ${response.data.lastName}`;
        document.getElementById('testResults').innerHTML = `${response.data.testResults}`;
        var willMove;
        if (`${response.data.willMove}`) {
            willMove = 'Willing to move';
        } else {
            willMove = 'Local only';
        }
        if (`${response.data.profileImg}` === "defaultImage") {
            console.log('default');
        } else {
            document.getElementById('profPic').src = `${response.data.profileImg}`;
        }
        document.getElementById('usrCity').innerHTML = `${response.data.city} ••• ${willMove}`;
        document.getElementById('usrWeb').innerHTML = `${response.data.website}`;
        document.getElementById('usrWeb').href = `${response.data.website}`;
    }

    function getInterview() {
        axios
        .post('/api/checkForApplicantInterview', {
            email: usrEmail,
        })
        .then(function (result) {
            if(result.data.length > 0) {
                createTable(result.data);
            } else {
                document.getElementById('interviewOut').innerHTML = "~ None yet ~";
            }

        })
    }

    function createTable(intRtrn) {
        console.log('here', intRtrn);
        var table = `
        <table style="margin-bottom: 0px" class="table table-striped table-dark text-center" id="appIntrvw">
            <thead><tr>
            <th scope="col">date</th>
            <th scope="col">time</th>
            <th scope="col">Location</th>
            </tr></thead><tbody>`;
        var interviewTime = new Date(`${intRtrn[0].interviewTime}`);
        var options = { weekday: 'long', month: 'long', year: 'numeric', day: 'numeric' };
        var dateOut = interviewTime.toLocaleDateString("en-US", options);
        var hours = interviewTime.getHours();
        var minutes = interviewTime.getMinutes();
        var timestring = 'AM';
        if (hours >= 12) {
            timestring = 'PM';
            if (hours !== 12) {
                hours -= 12;
            }
        }
        console.log(interviewTime);
        table += `<tr><th scope="row">${dateOut}</th>`;
        table += `<td>${hours}:${minutes} ${timestring}</td>`;
        table += `<td>${intRtrn[0].interviewLocation}</td></tr>`;
        table += `</tbody></table>`;

        document.getElementById('interviewOut').innerHTML = table;
    }

    const logout = () => {
        localStorage.clear();
        window.location.href = window.location.href
    }

    const edit = () => {
        setPage('CreateProfile');
    }
    
    const takeQuiz = () => {
        setPage('QuizHome');
    }

    return (
        <div className='container'>

            <div style={{
                backgroundImage: `url('${images[1]}')`,
                padding: "25px",
                marginTop: '25px',
                borderRadius: "100px 15px 15px 15px",
                textShadow:
                    "0.2em 0.2em 0.2em white,0.1em 0.1em 0.2em white,-0.2em 0.2em 0.2em white,-0.1em 0.1em 0.2em white,0.2em -0.2em 0.2em white,0.1em -0.1em 0.2em white,-0.2em -0.2em 0.2em white,-0.1em -0.1em 0.2em white"
            }}>
                <h5 onClick={logout} style={{ float: 'right', cursor: 'pointer', backgroundColor: 'grey' }}>Logout</h5>
                <p> </p>
                <h5 onClick={edit} style={{ float: 'right', cursor: 'pointer', backgroundColor: 'grey' }}>Edit</h5>
                <button onClick={takeQuiz}>Take the Quiz!</button>
                <div className="row">

                    <div className="col-md-4">
                        <img src={images.defaultImage} className="align-self-start mr-3" alt="profile pic" id='profPic'
                            style={{
                                width: "200px",
                                borderRadius: "100px",
                                border: "10px solid white",
                                boxShadow: "-5px 10px 10px grey",
                                marginBottom: '25px'
                            }}>
                        </img>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-6">
                        <h1 id="usrName"> - </h1>
                        <a id="usrWeb" href='www.google.com' target="_blank" rel="noopener noreferrer">Portfolio</a>
                        <p id="usrCity"></p>
                        <h5>Test Result:</h5>
                        <p id='testResults'></p>
                    </div>
                </div>
                <br></br>
                <div className="row" >
                    <div className="col-md-4"></div>
                    <div className="col-md-6"
                        style={{
                            backgroundColor: "white",
                            padding: "10px",
                            borderRadius: "10px"
                        }}
                    >
                        <p style={{
                            overflow: "hidden",
                            wordBreak: "break-word",
                            marginBottom: "0"
                        }}>
                            &#8195;<span id='usrDescription'></span>
                        </p>
                    </div>
                </div>
            </div>

            <div id="applicantInterview" className="">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <h3 style={{ marginBottom: "25px" }}> Interviews </h3>
                        <div id="interviewOut" className="col-md-12">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h6 id='test' style={{ marginTop: '25px' }}>Logged in as: {usrEmail}</h6>
        </div>
    );
}
export default Candidate;
import React from 'react'

const axios = require('axios');

function PortfolioBottom() {

    function createTable(intRtrn) {
        console.log('here', intRtrn);
        var table = `
        <table style="margin-bottom: 0px" class="table table-striped table-dark text-center" id="appIntrvw">
            <thead><tr>
            <th scope="col">date</th>
            <th scope="col">time</th>
            <th scope="col">Location</th>
            </tr></thead><tbody>`;
        var interviewTime = new Date(`${intRtrn.interviewTime}`);
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
        table += `<tr><th scope="row">${dateOut}</th>`;
        table += `<td>${hours}:${minutes} ${timestring}</td>`;
        table += `<td>${intRtrn.interviewLocation}</td></tr>`;
        table += `</tbody></table>`;

        document.getElementById('interviewOut').innerHTML = table;
    }

    function getInterview() {
        axios.get('/api/all/interviews')
            .then(function (result) {
                var intRtrn = {};
                console.log(window.atob(localStorage.getItem("email")), typeof window.atob(localStorage.getItem("email")))
                console.log(result.data[0].applicantEmail, typeof result.data[0].applicantEmail)
                for(var i = 0; i < result.data.length; i++) {
                    if (result.data[i].applicantEmail === window.atob(localStorage.getItem("email"))) {
                        intRtrn = result.data[i];
                        console.log(intRtrn);
                        createTable(intRtrn);
                        break;
                    }
                    document.getElementById('interviewOut').innerHTML = "~ None yet ~";
                }
            });
    }

    React.useEffect(function () {
        getInterview();
    });

    return (
        <div id="applicantInterview" className="cantTouchThis">
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
    );
}

export default PortfolioBottom
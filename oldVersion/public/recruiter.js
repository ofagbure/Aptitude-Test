async function recruiterPage() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    $(".container").append(`<div id='mid'></div>`);
    $('#top').css("opacity","1");
    $( '#top' ).html(`
    <div class="row">
        <div class="col-md-8">
            <h4 class="text-center"'>My Scheduled Interviews</h4>
            <div id="tableMain">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
        <div class="col-md-4 align-self-start">
            <div class="row">
                <div class="col-md-12 text-center">
                    <button onclick='logoutUser()' style="margin-bottom: 10px;">logout</button>
                </div>
            </div>
            <div id='recruiterProfile'>
                <h4 id='recruiterEmailDisplay' class="text-center" style="color:#fff; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;" alt="${user.email}">${user.email}</h4>
                <div style="background-color: #fff; margin: 10px; border-radius:10px;">
                    <h5 class="text-center">ID: ${user.id}</h5>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="profileDispModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    </div>
    <script>
    function logoutUser() {
        localStorage.clear();
        window.location = '/logout';
    }
    </script>
    `);
    scheduledInterviews();
    allApplicants();
    var hover = false;
    
    document.getElementById("recruiterEmailDisplay").addEventListener("onmouseover", function (event){
        hover = true;
        document.getElementById("recruiterEmailDisplay").addEventListener("onmouseout", function (event){
            hover = false;
        });
        while( hover === true ) {
            console.log(window.event.clientX);
        }
        
    });//position absolut
}

function scheduledInterviews() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    let b = {
        recruiterID: user.id
    }
    $.ajax("/api/getInterviews", {
        type: "GET",
        data: b
    }).then( function (results) {
        var table = `
        <table class="table table-striped table-dark text-center" id="interviewTable">
        <thead><tr>
            <th scope="col">user_id</th>
            <th scope="col">date</th>
            <th scope="col">time</th>
            <th scope="col">Location</th>
        </tr></thead><tbody>`;
        results.map(interview => {
            var interviewDate = new Date(`${interview.interview_time}`);
            var options = { weekday: 'long', month: 'long', year: 'numeric',  day: 'numeric' };
            var dateOut = interviewDate.toLocaleDateString("en-US", options);
            var hours = interviewDate.getHours();
            var minutes = interviewDate.getMinutes();
            var timestring = 'AM';
            if(hours >= 12) {
                timestring = 'PM';
                if(hours != 12) {
                    hours -= 12;
                }
            }
            table += `<tr><th scope="row">${interview.interview_id}</th>`;
            table += `<td>${dateOut}</td>`;
            table += `<td>${hours}:${minutes} ${timestring}</td>`;
            table += `<td>${interview.interview_location}</td></tr>`;
        });
        table += `</tbody></table>`;
        $("#tableMain").html(table);
    });
}

function allApplicants() {

    $.ajax("/api/allApplicants", {
        type: "GET",
    }).then( function (results) {
        var table = `
        <table class="table table-striped table-dark text-center" id="interviewTable">
        <thead><tr>
            <th scope="col">user_id</th>
            <th scope="col">name</th>
            <th scope="col">test results</th>
            <th scope="col">interviews</th>
            <th scope="col">profile</th>
        </tr></thead><tbody id="tableInsert"></tbody></table>`;
        $("#mid").append(table);
        results.map(applicant => {
            let b = {
                userID: applicant.user_id
            }
            $.ajax("/api/userPortfolio", {
                type: "GET",
                data: b
            }).then( function (results) {
                if (typeof results[0] !== 'undefined') {
                    if(results[0].testresults === null) {
                        results[0].testresults = 'Not yet taken'
                    }
                    let table = `<tr><th scope="row">${results[0].user_id}</th>`;
                    table += `<td>${results[0].first_name} ${results[0].last_name}</td>`;
                    table += `<td>${results[0].testresults}</td>`;
                    table += `<td id='interviews${results[0].user_id}'> NULL </td>`;
                    table += `<td> <button onClick="viewProfile('${results[0].user_id}')">view</button> </td></tr>`;
                    $("#tableInsert").append(table);
                    let b = {
                        userID: results[0].user_id
                    }
                    var fullName = `${results[0].first_name} ${results[0].last_name}`;
                    $.ajax("/api/getUserInterview", {
                        type: "GET",
                        data: b
                    }).then( function (results) {
                        if(results.length === 0){
                            $(`#interviews${b.userID}`).html(`<button onClick="scheduleInterview('${b.userID}','${fullName}')">schedule</button>`);
                        } else {
                            $(`#interviews${b.userID}`).html(`Scheduled!`);
                        }
                    });
                }
            });
            
        });
        

    });

}

function viewProfile(id) {
    let b = {
        userID: id
    }
    $.ajax("/api/userPortfolio", {
        type: "GET",
        data: b
    }).then( function (results) {

        var willingToMove = "";
        if(results[0].willmove === 1) {
            willingToMove = "Willing to move";
        } else {
            willingToMove = "Local only";
        }
        var testResultOut = "";
        if (results[0].testresults === null) {
            testResultOut = "Not yet taken";
        } else {
            testResultOut = results[0].testresults;
        }
        $("#profileDispModal").html(`
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="userProfTitle">${results[0].first_name} ${results[0].last_name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                <div class="modal-body">
                    <div id="portfolioBackground" style="background-image: url('./images/${results[0].profback}.png');">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="${results[0].profile_img}" class="align-self-start mr-3" alt="default profile pic" style="width:200px; border-radius: 100px; border: 10px solid white; box-shadow: -5px 10px 10px grey;">
                            </div>
                            <div class="col-md-6">
                                <h1>${results[0].first_name} ${results[0].last_name}</h1>
                                <a href="${results[0].website}" target="_blank">Portfolio</a>
                                <p>${results[0].city} ••• ${willingToMove}</p>
                                <h5>Test Result:</h5>
                                <p>${testResultOut}</p>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-2"></div>
                            <div class="col-md-8" style="background-color: white; padding: 10px; border-radius: 10px;">
                                <p style="overflow: hidden; word-break: break-word;">${results[0].descrip}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
        $('#profileDispModal').modal('toggle');
    });
}

function scheduleInterview(id, fullName) {
    const user = JSON.parse(window.localStorage.getItem('user'));
    $("#profileDispModal").html(`
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class='text-center'>Interview for ${fullName}</h5>
                    <button id='modalCloseBtn' type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-center">
                    <div class="row">
                        <div class="col-md-12">
                            <h4>Select Interviewer</h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <input id='filterSearch' type="text" placeholder="Search by email" onkeyup="tableFilter()" style="margin: 0px 0px 10px">    
                            <select id="selectSchedInter" size="5">
                                <option value="${user.id}">${user.email} (you)</option>
                            </select>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-12">
                            <h4>Enter a location:</h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <textarea id='intrvwLocation' rows="3" style='width: 100%; text-align: center;'></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <input type="datetime-local" id="interviewTime" name="interviewTime">
                            <button onclick="scheduleSend('${id}')" style="margin: 5px;">Schedule!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);
    $.ajax("/api/allRecruiters", {
        type: "GET",
    }).then( function (results) {
        var options = "";
        results.map(recruiter => {
            if(recruiter.user_id !== user.id) {
                options += `<option value="${recruiter.user_id}">${recruiter.email}</option>`;
            }
        });
        $('#selectSchedInter').append(options);
    });
    $('#profileDispModal').modal('toggle');
}

function tableFilter() {
    let search = $('#filterSearch').val().toLowerCase();
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

function isEmpty(string) {
    if(string === null || string === "" || /\s/g.test(string) === "") {
        return true;
    } else {
        return false;
    }
}

function scheduleSend(id) {
    var interviewer = document.getElementById('selectSchedInter');
    interviewer.style.border = "1px solid rgba(0,0,0,.2)";
    var location = document.getElementById('intrvwLocation');
    location.style.border = "1px solid rgba(0,0,0,.2)";
    var time = document.getElementById('interviewTime');
    time.style.border = "1px solid rgba(0,0,0,.2)";

    if(isEmpty(interviewer.value)) {
        interviewer.style.border = "2px solid red";
        return;
    } else if (isEmpty(location.value)) {
        location.style.border = "2px solid red";
        return;
    } else if (isEmpty(time.value)) {
        time.style.border = "2px solid red";
        return;
    }
    let b = {
        userID: id,
        interviewTime: time.value,
        interviewLocation: location.value,
        recruiterID: interviewer.value
    }
    $.ajax("/api/addInterview", {
        type: "PUT",
        data: b
    }).then( function (results) {
        $('#profileDispModal').modal('toggle');
        setTimeout(function() {
            $( '#top' ).empty();
            $( '#mid' ).empty();
            $( '#top' ).html(`<h1 style='text-align: center;'>Updated!</h1>`);
        },500);
        setTimeout(function() {
            reloadPage();
        },1500);
    });
}
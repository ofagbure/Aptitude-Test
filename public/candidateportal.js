document.addEventListener("DOMContentLoaded", function(){
    const user = JSON.parse(window.localStorage.getItem('user'));
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    function editProfile() {
        window.localStorage.setItem('portfolio', null);
        location.reload();
        return;
    }
    let b = {
        userID: user.id
    }
    $.ajax("/api/userPortfolio", {
        type: "GET",
        data: b
    }).then( function (results) {
        if (user.recruiter === 1) {
            recruiterPage();
            return;
        } else if (typeof results[0] === 'undefined') {
            welcome();
            return; 
        } else {
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
            $('#top').css("opacity","1");
            $( '#top' ).html(`
            <div class="row" style="margin-bottom: 25px;">
                <div class="col-md-6"></div>
                <div class="col-md-6">
                    <button onclick='logoutUser()' style="float: right; margin: 2px;">logout</button> 
                    <button onclick='editProfile()' style="float: right; margin: 2px;">edit profile</button> 
                </div>
            </div>
            <div id="portfolioBackground" class="unselectable" style="background-image: url('./images/${results[0].profback}.png');">
                <div class="row">
                    <div class="col-md-4">
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
            <div id="portfolioApplications" class="unselectable">
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                        <h3 style='margin-bottom: 25px;'> Interviews </h3>
                        <div id="interviewOut" class="col-md-12">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script>
                function logoutUser() {
                    localStorage.clear();
                    window.location = '/logout';
                }
            </script>
            `);
            let b = {
                userID: results[0].user_id
            }
            $.ajax("/api/getUserInterview", {
                type: "GET",
                data: b
            }).then( function (interview) {
                if(typeof interview[0] === 'undefined') {
                    $("#interviewOut").html(`<h5>None yet<h5>`);
                    return;
                }
                console.log(typeof interview, ":", interview, ":", typeof interview[0]);
                var table = `
                    <table style="margin-bottom: 0px" class="table table-striped table-dark text-center" id="interviewTable">
                        <thead><tr>
                        <th scope="col">date</th>
                        <th scope="col">time</th>
                        <th scope="col">Location</th>
                        </tr></thead><tbody>`;
                var interviewDate = new Date(`${interview[0].interview_time}`);
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
                table += `<tr><th scope="row">${dateOut}</th>`;
                table += `<td>${hours}:${minutes} ${timestring}</td>`;
                table += `<td>${interview[0].interview_location}</td></tr>`;
                table += `</tbody></table>`;
                $("#interviewOut").html(table);
            });
        }
    });
});

function reloadPage() {
    location.reload();
    return;
}
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
        if(typeof results[0] === 'undefined') {
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
            <div id="portfolioBackground">
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
            <script>
                function logoutUser() {
                    localStorage.clear();
                    window.location = '/logout';
                }
            </script>
            `);
        }
    });
});
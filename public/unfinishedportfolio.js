let newAcc = false;
let profPicHolder = "./images/blank-profile-picture.webp";

function welcome() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const emailDsp  = document.getElementById('emailDsp');
    const topBot = document.getElementById('top-bot');
    const top = document.getElementById('top');

    emailDsp.innerHTML = user.email;
    emailDsp.style.animation = "load 1.5s"; 
    emailDsp.style.position = "relative";
    emailDsp.style.display = "block";

    var btn = document.createElement("button");
    btn.innerHTML = "Click here to complete your portfolio!";
    btn.classList.add("purpleBtn");
    btn.style.opacity = "0";
    topBot.appendChild(btn);
    btn.style.animation = "fadein 0.5s linear 1.5s";

    setTimeout(function() {
        btn.style.opacity = "1";
    },1500);

    btn.addEventListener("click", function() {
        editProfile();
    });
    top.style.opacity = "1";
}


function editProfile() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    let b = {
        userID: user.id
    }
    $.ajax("/api/userPortfolio", {
        type: "GET",
        data: b
    }).then( function (results) {
        if(typeof results[0] === 'undefined') {
            tmpPortfolio = {
                firstName: "",
                lastName: "",
                city: "",
                willMove: false,
                falseChecked: "checked",
                profilePic: "./images/blank-profile-picture.webp",
                userDescription: "",
                website: ""
            } 
            newAcc = true;
        } else {
            var tmpPortfolio = {
                firstName: results[0].first_name,
                lastName: results[0].last_name,
                city: results[0].city,
                willMove: false,
                falseChecked: "checked",
                profilePic: results[0].profile_img,
                userDescription: results[0].descrip,
                website: results[0].website
            };
            if(results[0].willmove === 1) {
                tmpPortfolio.willMove = true;
                tmpPortfolio.falseChecked = "";
            }
        }
    profPicHolder = tmpPortfolio.profilePic;
    $( '#top' ).empty();
    $( '#top' ).html(`
        <form>
            <h1 style='text-align:center;'> User Information </h1>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <span style='color: red; font-weight: bolder;'>* </span><label for="firstName">First Name</label>
                    <input type="text" class="form-control" id="firstName" value="${tmpPortfolio.firstName}">
                </div>
                <div class="animate form-group col-md-6">
                    <span style='color: red; font-weight: bolder;'>* </span><label for="lastName">Last Name</label>
                    <input type="text" class="form-control" id="lastName" value="${tmpPortfolio.lastName}">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <span style='color: red; font-weight: bolder;'>* </span><label for="city">City</label>
                    <input type="text" class="form-control" id="city" value="${tmpPortfolio.city}">
                </div>
            
                <div class="animate form-group col-md-6">
                    <span style='color: red; font-weight: bolder;'>* </span><label><p>Are you willing to relocate?</p></label>
                    <div id="yesNoOptions">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="yescheckbox" value=true checked>
                            <label class="form-check-label" for="exampleRadios1">
                            Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="nocheckbox" value=false ${tmpPortfolio.falseChecked}>
                            <label class="form-check-label" for="exampleRadios2">
                            No
                            </label>
                        </div>
                    </div>
                </div>
            </div> 
            <h1 style='text-align:center;'> Profile Creation </h1>
            <br>
            <div class="form-row media">
                <div class="col-md-6">
                    <img src="${tmpPortfolio.profilePic}" class="align-self-start mr-3" alt="default profile pic" style="width:200px; border-radius: 100px;">
                </div>
                <div class="col-md-6">
                    <p>Enter a link to an image for your profile picture</p>
                    <input type="text" class="form-control" id="profilePic">
                    <label for="userDescription">Describe yourself!</label>
                    <textarea class="form-control" id="userDescription" rows="3" maxlength="499">${tmpPortfolio.userDescription}</textarea>
                </div>
            </div>
            <br>
            <div class="form-row">
                <div class="col-md-2"></div>
                <div class="animate form-group col-md-8">
                    <p style="text-align: center;">Enter a link to your personal website or portfolio</p>
                    <input type="text" class="form-control" id="website" value="${tmpPortfolio.website}">
                </div>
            </div>
        </form>
        <br>
        <br>
        <a id="createPortfolioBtn" class="purpleBtn" style='color:white;' onClick='savePortfolio()'>
            Save Portfolio
        </a>`);
    });
}
function isEmpty(string) {
    if(string === null || string === "" || /\s/g.test(string) === "") {
        return true;
    } else {
        return false;
    }
}

function savePortfolio() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const firstNameField = document.getElementById('firstName');
    const lastNameField  = document.getElementById('lastName');
    const cityField = document.getElementById('city');
    const isYesChecked = document.getElementById('yescheckbox');
    const profilePicField = document.getElementById('profilePic');
    const userDescriptionField  = document.getElementById('userDescription');
    const websiteField = document.getElementById('website');
    var willMoveValue;

    if(isYesChecked.checked) {
        willMoveValue = 1;
    } else {
        willMoveValue = 0;
    }

    firstNameField.style.border = "1px solid #ced4da";
    lastNameField.style.border = "1px solid #ced4da";
    cityField.style.border = "1px solid #ced4da";
    
    if(isEmpty(firstNameField.value)) {
        firstNameField.style.border = '2px solid red';
        return;
    } else if(isEmpty(lastNameField.value)){
        lastNameField.style.border = '2px solid red';
        return;
    } else if(isEmpty(cityField.value)){
        cityField.style.border = '2px solid red';
        return;
    }

    let a = {
        firstName: `${firstNameField.value}`,
        lastName: `${lastNameField.value}`,
        city: `${cityField.value}`,
        willMove: willMoveValue,
        profilePic: `${profilePicField.value}`,
        userDescription: `${userDescriptionField.value}`,
        website: `${websiteField.value}`,
        userID: user.id
    };

    if(isEmpty(a.profilePic)){
        a.profilePic = profPicHolder;
    }
    

    var route;

    if(newAcc) {
        route = "/api/addPortfolio";
    } else {
        route = "/api/updatePortfolio";
    }

    $.ajax(route, {
        type: "PUT",
        data: a
    }).then( function (res) {
        window.localStorage.setItem('portfolio', true);
        $( '#top' ).empty();
        $( '#top' ).html(`<h1 style='text-align: center;'>Updated!</h1>`);
        setTimeout(function() {
            location.reload();
        },1000);
    });

}
// let a = {
//     email : email.value,
//     password : password.value,
//     isRecruiter : isRecruiter.value
// };

// function getProfile() {
//     const user = JSON.parse(window.localStorage.getItem('user'));
//     let b = {
//         userID: user.id
//     }
//     $.ajax("/api/userPortfolio", {
//         type: "GET",
//         data: b
//     }).then( function (results) {
//         console.log(results);
//         var toRtrn = {
//             firstName: results[0].first_name,
//             lastName: results[0].last_name,
//             city: results[0].city,
//             willMove: false,
//             falseChecked: "checked",
//             profilePic: results[0].profile_img,
//             userDescription: results[0].descrip,
//             website: results[0].website
//         };
//         if(results[0].willmove === 1) {
//             toRtrn.willMove = true;
//             toRtrn.falseChecked = "";
//         }
//         console.log(toRtrn);
//         return toRtrn;
//     });
    
// }
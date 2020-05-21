import React from 'react';
import NoPortfolio from './NoPortfolio';
import Button from '../../components/Button';
import PortfolioTop from '../../components/PortfolioTop';
import PortfolioBottom from '../../components/PortfolioBottom';
import Loading from '../../components/Loading';
import { useHistory } from "react-router-dom";

const axios = require('axios');

function Portfolio(props) {
    const history = useHistory();
    const [EditPortfolio, setEditPortfolio] = React.useState(false);
    const [IsLoading, setIsLoading] = React.useState(true);
    const [HasGottenProfile, setHasGottenProfile] = React.useState(false);

    var user = {
        profileBackground: 1,
        firstName:"empty",
        lastName:"empty",
        email:"empty",
        profileImg:"defaultImage",
        website:"",
        description:"",
        city:"",
        willMove:false,
        testResults:"Not yet taken!",
        date: `${Date.now}`
    }
    const [UsrProfile, setUsrProfile] = React.useState({user});
    React.useEffect(() => {
        console.log(props.hasPortfolio);
        if(props.hasPortfolio === true && HasGottenProfile === false) {
            getProfileManager(HasGottenProfile);
        }
    });
    function getProfileManager(bool) {
        if (!bool) {
                getProfile();
          }
    }
    function getProfile() {
        let url = `/api/one/profile/email/${window.atob(localStorage.getItem("email"))}`;
        axios.get(url)
            .then(function (result) {
                var profPic;
                console.log(result)
                let obj = {
                    value: result.data.profileImg
                }
                if(isEmpty(obj)) {
                    profPic = 'defaultImage';
                } else {
                    profPic = result.data.profileImg;
                }
                console.log(profPic);
                console.log(result.data.profileImg);
                user = {
                    profileBackground: result.data.profileBackground,
                    firstName: result.data.firstName,
                    lastName: result.data.lastName,
                    email: result.data.email,
                    profileImg: profPic,
                    website: result.data.website,
                    description: result.data.description,
                    city: result.data.city,
                    willMove: result.data.willMove,
                    testResults: result.data.testResults,
                    date: result.data.date
                }
                setHasGottenProfile(true);
                setUsrProfile(user);
                setTimeout(function(){setIsLoading(false)},500);
                
        })
    }

    function edit(){
        setEditPortfolio(true);
    }

    if(props.hasPortfolio && EditPortfolio === false) {
        if(IsLoading) {
            return (<Loading/>);
        } else {
            console.log(UsrProfile[1]);
            return (
                <div>
                    <PortfolioTop 
                    profileBackground={UsrProfile.profileBackground}
                    firstName={UsrProfile.firstName}
                    lastName={UsrProfile.lastName}
                    profileImg={UsrProfile.profileImg}
                    website={UsrProfile.website}
                    city={UsrProfile.city}
                    willMove={UsrProfile.willMove}
                    testResults={UsrProfile.testResults}
                    description={UsrProfile.description}
                    editBtn={[
                        <div key='btnContainer'>
                        <Button key="editBtn" name="Edit Portfolio" color="1" onclick={edit}/>
                        <Button key="quizBtn" name="Take Quiz" color="2" onclick={function changeWin() { history.push('/quiz')} }/>
                        </div>
                    ]}
                    />
                    <PortfolioBottom />
                </div>
        );
        }
    } else {
        return (
            <NoPortfolio edit={EditPortfolio} setEditPortfolio={setEditPortfolio} setPortfolio={props.setPortfolio} hasPortfolio={props.hasPortfolio} hasGottenProfile={HasGottenProfile} setHasGottenProfile={setHasGottenProfile}/>
        );
    }
}

function isEmpty(obj) {
    if(obj.value === null || obj.value === "" || /\s/g.test(obj.value) === "") {
        return true;
    } else {
        return false;
    }
}

export default Portfolio;

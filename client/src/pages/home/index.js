import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import placeholder1 from "../../images/placeholder 1.jpg"
import placeholder2 from "../../images/placeholder 2.jpg"
import placeholder3 from "../../images/placeholder 3.jpg"
import jobDescrip from "../../images/job descriptions.jpg"
import testPic from "../../images/test.jpeg"
import newProfPic from "../../images/createprofile.jpg"

function Home() {
    const [windowHeight, setWindowHeight] = useState(`${window.innerHeight + window.pageYOffset - 44 + "px"}`);

    React.useEffect(() => {
        function resize() {
            setWindowHeight(`${window.innerHeight - 44 + "px"}`);
        }
        window.addEventListener('resize', resize);
    });

    return (

        <div id='main' style={{
            height: `${windowHeight}`, overflow: "scroll", overflowX: "hidden",
            backgroundColor: 'white'
        }}>

            <Navbar active="Home" />



            <div className="container">
                <br />
                <div id="carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={placeholder1} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={placeholder2} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={placeholder3} className="d-block w-100" alt="..." />
                        </div>
                    </div>
                </div>
                <hr />
                <br />
                <div id="chooberHome" className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="text-center">Choober</h1>
                                <h5> Here at Choober, we are committed to providing top-tier service to busy parents. We offer a safe and reliable way for parents to focus on other life needs knowing that their children are safe and being taken where they need to go.</h5>
                                <br />
                                <h5> Have a meeting at the exact time your child needs to be taken to baseball practice? Call Choober! We're Uber... But for kids.</h5>
                                <br />
                                <h5> Join our team of dedicated service providers for a chance to be a part of helping people experience well-being through community!</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <hr />
                <div className="row" id="linkCards">
                    <div className="col-md-4">
                        <div className="card clickableCard" style={{ width: "100%" }}>
                            <img src={jobDescrip} className="card-img-top" alt="..." />
                            <div className="card-body text-center">
                                <h5 className="card-title">View Our Roles</h5>
                                <p className="card-text">Want some more information on our roles? View all career options and find out how they come together to form Choober below.</p>
                                <a href="./roles" className="btn btn-primary" style={{backgroundColor: "#842176"}}>To the roles!</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card clickableCard" style={{ width: "100%" }}>
                            <img src={newProfPic} className="card-img-top" alt="..." />
                            <div className="card-body text-center">
                                <h5 className="card-title">Create a Candidate Profile</h5>
                                <p className="card-text">Create and complete your profile to get an interview with our outstanding recruiters. Only takes minutes!</p>
                                <a href="./candidateportal" className="btn btn-primary" style={{backgroundColor: "#842176"}}>Go to profile</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card clickableCard" style={{ width: "100%" }}>
                            <img src={testPic} className="card-img-top" alt="..." />
                            <div className="card-body text-center">
                                <h5 className="card-title">Take the Company Test</h5>
                                <p className="card-text">Not sure what role to apply to? Don't worry! Create an account and take the aptitude test to get
                                matched to the role that's right for you.</p>
                                <a href="./candidateportal" className="btn btn-primary" style={{backgroundColor: "#842176"}}>Create Account</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </div>
    );
}
export default Home
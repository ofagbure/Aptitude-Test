import React from 'react'
import images from '../images';

function PortfolioTop(props) {
    console.log(props);

    var willMove = ""
    React.useEffect(() => {
        if(props.willMove) {
            willMove = "Willing to move";
        } else {
            willMove = "Local only";
        }
        if(props.profileImg === "defaultImage") {
            document.getElementById('profPic').src = images.defaultImage;
        } else {
            document.getElementById('profPic').src = props.profileImg;
        }
        document.getElementById('moveDisp').innerHTML = willMove;
    });
    // moveDisp
    return(
        <div className="cantTouchThis"
        style={{
            backgroundImage: `url('${images[props.profileBackground]}')`,
            padding: "25px",
            borderRadius: "100px 15px 15px 15px",
            textShadow: 
                "0.2em 0.2em 0.2em white,0.1em 0.1em 0.2em white,-0.2em 0.2em 0.2em white,-0.1em 0.1em 0.2em white,0.2em -0.2em 0.2em white,0.1em -0.1em 0.2em white,-0.2em -0.2em 0.2em white,-0.1em -0.1em 0.2em white"
        }}>
            <div className="row" >
                <div className="col-md-4">
                    <img src={images.defaultImage} className="align-self-start mr-3" alt="profile pic" id='profPic'
                    style={{
                        width: "200px",
                        borderRadius: "100px",
                        border: "10px solid white",
                        boxShadow: "-5px 10px 10px grey"
                    }}></img>
                </div>
                <div className="col-md-6">
                    <h1 className="unselectable" id="usrName">{props.firstName} {props.lastName}</h1>
                    <a id="usrWeb" href={props.website} target="_blank">Portfolio</a>
                    <p id="usrMov">{props.city} ••• <span id='moveDisp'></span></p>
                    <h5>Test Result:</h5>
                    <p>{props.testResults}</p>
                </div>
                <div className="col-md-2">
                    {props.editBtn}
                </div>
            </div>
            <br></br>
            <div className="row" >
                    <div className="col-md-2"></div>
                    <div className="col-md-8"
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
                                &#8195;{props.description}
                        </p>
                    </div>
            </div>
        </div>
    );
}

function isEmpty(string) {
    if(string === null || string === "" || /\s/g.test(string) === "") {
        return true;
    } else {
        return false;
    }
}

export default PortfolioTop